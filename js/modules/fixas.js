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
        Salvar
      </button>

    </div>

    <div id="listaFixas"></div>
  `;

  listarFixas();
}


/* ========== LISTAR DESPESAS FIXAS ========== */
function listarFixas(){

  const lista =
    document.getElementById("listaFixas");

  if(!lista){
    return;
  }
  /* =============== lista vazia =============== */
  if(!fixas.length){

    lista.innerHTML = `
      <div class="card">
        Nenhuma despesa fixa cadastrada.
      </div>
    `;

    return;
  }
  /* ================ ordenação ================ */
  const listaOrdenada = fixas
    .slice()
    .sort((a, b) => {

      const diaA = Number(a[4]) || 0;
      const diaB = Number(b[4]) || 0;

      return diaA - diaB;

    });

  let html = "";
  /* ================== render ================== */
  listaOrdenada.forEach(f => {

    const categoria =
      String(f[1] || "").trim();

    const descricao =
      String(f[2] || "").trim();

    const valor =
      Number(f[3]) || 0;

    const dia =
      Number(f[4]) || 0;

    html += `

      <div
        class="card"
        style="
          display:flex;
          justify-content:space-between;
          align-items:center;
        "
      >

        <div>

          <div style="
            font-size:16px;
            font-weight:600;
          ">
            ${categoria}
          </div>

          <div style="
            font-size:13px;
            opacity:.8;
            margin-top:4px;
          ">
            ${descricao}
          </div>

          <div style="
            font-size:12px;
            opacity:.7;
            margin-top:6px;
          ">
            Dia ${dia}
          </div>

        </div>

        <div style="
          font-weight:bold;
          color:#ef4444;
        ">
          R$ ${valor.toFixed(2)}
        </div>

      </div>

    `;

  });

  lista.innerHTML = html;
}


/* ========== SALVAR DESPESAS FIXAS ========== */
async function salvarFixa(){

  const categoria =
    document.getElementById("fx_categoria").value;

  const descricao =
    document.getElementById("fx_descricao").value;

  const valor =
    document.getElementById("fx_valor").value;

  const dia =
    document.getElementById("fx_dia").value;

  if(!categoria || !descricao || !valor || !dia){
    alert("Preencha os campos");
    return;
  }

  await postAPI({    
      acao:"salvar_fixa",
      categoria,
      descricao,
      valor,
      dia
    });  

  await carregar();
  
}