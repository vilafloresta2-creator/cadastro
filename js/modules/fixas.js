/* =========================================
   FIXAS
========================================= */


/* ========== RENDER DESPESAS FIXAS ========== */
function renderFixas(){

  tela.innerHTML = `

    <div class="card">

      <h3>Nova Despesa Fixa</h3>

      <input
        id="fx_categoria"
        placeholder="Categoria"
      >

      <input
        id="fx_descricao"
        placeholder="Descrição"
        style="margin-top:8px;"
      >

      <input
        id="fx_valor"
        type="number"
        step="0.01"
        placeholder="Valor"
        style="margin-top:8px;"
      >

      <input
        id="fx_dia"
        type="number"
        min="1"
        max="31"
        placeholder="Dia do mês"
        style="margin-top:8px;"
      >

      <button
        class="btn"
        style="margin-top:10px;"
        onclick="salvarFixa()"
      >

        💾 Salvar

      </button>

    </div>

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
        class="card"
        style="
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

        <div style="
          font-weight:bold;
          color:#ef4444;
          white-space:nowrap;
        ">

          ${moeda(valor)}

        </div>

      </div>

    `;
  });

  listaEl.innerHTML = html;
}


/* ========== SALVAR DESPESA FIXA ========== */
function salvarFixa(){

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

    await carregar();

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