/* =========================================
   FIXAS
========================================= */


/* ========== RENDER DESPESAS FIXAS ========== */
function renderFixas(){

  tela.innerHTML = `

    <div id="listaFixas"></div>

    `;

  listarFixas();

}


/* ========== LISTAR DESPESAS FIXAS ========== */
function listarFixas(){

  const listaEl =
    document.getElementById(
      "listaFixas"
    );

  if(!listaEl){
    return;
  }

  const listaFixas =
    safeArray(state.fixas);

  /* ============== LISTA VAZIA ============== */
  if(!listaFixas.length){

    listaEl.innerHTML = `

      <div class="card">
        Nenhuma despesa fixa cadastrada.
      </div>

    `;

    return;
  }

  /* ================ ORDENAÇÃO ================ */
  const listaOrdenada =

    listaFixas

      .slice()

      .sort((a, b) =>

        numero(a?.[4])

        -

        numero(b?.[4])

      );

  let html = "";


  /* ================== RENDER ================== */
  listaOrdenada.forEach(f => {

    if(!f || !f.length){
      return;
    }

    const categoria =

      String(f[1] || "")
        .trim();

    const descricao =

      String(f[2] || "")
        .trim();

    const valor =
      numero(f[3]);

    const dia =
      numero(f[4]);

    html += `

      <div
        class="card fixa-card"
        onclick="editarFixa('${f[0]}')"
        style="
          cursor:pointer;
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:10px;
        "
      >

        <div>

          <div style="
            font-size:16px;
            font-weight:600;
          ">

            ${categoria || "-"}

          </div>

          <div style="
            font-size:13px;
            opacity:.8;
            margin-top:4px;
          ">

            ${descricao || "-"}

          </div>

          <div style="
            font-size:12px;
            opacity:.7;
            margin-top:6px;
          ">

            📅 Dia ${dia}

          </div>

        </div>

        <div>

        <div style="
          font-weight:bold;
          color:#ef4444;
          white-space:nowrap;
        ">

          ${moeda(valor)}

        </div>

        <button
        class="btn-cancelar btn-icon"
        onclick="
          event.stopPropagation();
          excluirFixa('${f[0]}');
        "
      >
        🗑️
      </button>

      </div>
      </div>
    `;
  });

  listaEl.innerHTML = html;
}


/* ========== SALVAR DESPESA FIXA ========== */
async function salvarFixa(){

  const id =
  state.editandoFixaId || "";
  
  const categoria =

    String(
      document.getElementById(
        "fx_categoria"
      )?.value || ""
    )

      .trim();

  const descricao =

    String(
      document.getElementById(
        "fx_descricao"
      )?.value || ""
    )

      .trim();

  const valor =

    numero(

      document.getElementById(
        "fx_valor"
      )?.value

    );

  const dia =

    numero(

      document.getElementById(
        "fx_dia"
      )?.value

    );

  /* ================= VALIDAÇÃO ================= */
  if(
    !categoria
    ||
    !descricao
    ||
    !valorPositivo(valor)
  ){

    showToast(
      "Preencha os campos corretamente",
      "warning"
    );

    return;
  }

  if(dia < 1 || dia > 31){

    showToast(
      "Dia inválido",
      "warning"
    );

    return;
  }

  showLoading(
    "Salvando despesa fixa..."
  );

  try{

    const resp = await postAPI({

      acao:"salvar_fixa",

      id,
      categoria,
      descricao,
      valor,
      dia

    });

    if(resp.erro){

      showToast(
        resp.erro,
        "error"
      );

      return;
    }

    /* ================= LIMPA FORM ================= */
    document.getElementById(
      "fx_categoria"
    ).value = "";

    document.getElementById(
      "fx_descricao"
    ).value = "";

    document.getElementById(
      "fx_valor"
    ).value = "";

    document.getElementById(
      "fx_dia"
    ).value = "";

    showToast(
      "Despesa fixa salva!",
      "success"
    );

    state.editandoFixaId = null;

    await carregar();

    listarFixas();

  }catch(error){

    console.error(error);

    showToast(
      "Erro ao salvar despesa fixa",
      "error"
    );

  }finally{

    hideLoading();
  }
}


/* ================= editar ================= */
function editarFixa(id){

  const fixa =

    safeArray(state.fixas)

      .find(f =>

        String(f[0])
        ===
        String(id)

      );

  if(!fixa){
    return;
  }

  state.editandoFixaId = id;

  getEl("fx_categoria").value =
    fixa[1] || "";

  getEl("fx_descricao").value =
    fixa[2] || "";

  getEl("fx_valor").value =
    fixa[3] || "";

  getEl("fx_dia").value =
    fixa[4] || "";
}

/* ================= excluir ================= */
async function excluirFixa(id){

  if(
    !confirm(
      "Excluir esta despesa fixa?"
    )
  ){
    return;
  }

  const resp = await postAPI({

    acao:"excluir_fixa",
    id

  });

  if(resp.erro){

    showToast(
      resp.erro,
      "error"
    );

    return;
  }

  showToast(
    "Despesa fixa excluída",
    "success"
  );

  await carregar();

  listarFixas();
}


/* ================= MODAL ================= */
function abrirModalFixa(){

  state.editandoFixaId = null;

  modal.innerHTML = `

    <div
      class="modal-box"
      onclick="event.stopPropagation()"
    >

      <h3>Nova Despesa Fixa</h3>

      <input
        id="fx_categoria"
        placeholder="Categoria"
      >

      <input
        id="fx_descricao"
        placeholder="Descrição"
      >

      <input
        id="fx_valor"
        type="number"
        step="0.01"
        placeholder="Valor"
      >

      <input
        id="fx_dia"
        type="number"
        min="1"
        max="31"
        placeholder="Dia do mês"
      >

      <div class="acoes">

        <button
          class="btn"
          onclick="salvarFixa()"
        >
          💾 Salvar
        </button>

        <button
          class="btn-cancelar"
          onclick="modal.classList.remove('show')"
        >
          Cancelar
        </button>

      </div>

    </div>

  `;

   modal.classList.add("show");
   
}