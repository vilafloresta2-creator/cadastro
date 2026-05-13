/* ================= RENDER DESPESAS FIXAS ================= */
function renderFixas(){

  tela.innerHTML = `

    <div class="card">

      <h3>Nova Despesa Fixa</h3>

      <input id="fx_categoria" placeholder="Categoria">

      <input id="fx_descricao" placeholder="Descrição"
        style="margin-top:8px;">

      <input id="fx_valor" type="number"
        placeholder="Valor"
        style="margin-top:8px;">

      <input id="fx_dia" type="number"
        placeholder="Dia do mês"
        style="margin-top:8px;">

      <button class="btn"
        style="margin-top:10px;"
        onclick="salvarFixa()">

        Salvar
      </button>

    </div>

    <div id="listaFixas"></div>
  `;

  listarFixas();
}

/* ================= LISTA DESPESAS FIXAS ================= */
function listarFixas(){

  let html = "";

  fixas.forEach(f => {

    html += `
      <div class="card"
        style="display:flex;
        justify-content:space-between;
        align-items:center;">

        <div>
          <b>${f[1]}</b><br>

          ${f[2]}<br>

          Dia ${f[4]}<br>

          R$ ${Number(f[3]).toFixed(2)}
        </div>

      </div>
    `;
  });

  document.getElementById("listaFixas")
    .innerHTML = html;
}