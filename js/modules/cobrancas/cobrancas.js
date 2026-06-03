/* =========================================
   COBRANCAS
========================================= */


/* ========== LISTAR ========== */
function listarCobrancas(){

  const filtroMes =
    getValue("filtroMes");

  let lista =
    safeArray(state.cobrancas);

  lista =
    filtrarCobrancasPorMes(
      lista,
      filtroMes
    );

  if(!lista.length){

    setHTML(

      "lista",

      `

        <div class="card">

          Nenhuma cobrança encontrada.

        </div>

      `
    );

    return;
  }

  const html =

    lista

      .slice()

      .reverse()

      .map(renderCardCobranca)

      .join("");

  setHTML(
    "lista",
    html
  );
}

/* =========================================
   RENDER COBRANÇAS
========================================= */

function renderCobrancas(){

  tela.innerHTML = `

    <div class="top">

      <input
        type="month"
        id="filtroMes"
        onchange="listarCobrancas()"
      >

      <button
        class="btn"
        onclick="gerarCobrancas()"
      >
        Gerar Cobranças
      </button>

    </div>

    <div id="lista"></div>

  `;

  listarCobrancas();
}