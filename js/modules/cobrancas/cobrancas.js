/* =========================================
   COBRANCAS
========================================= */


/* ========== LISTAR ========== */
function listarCobrancas(){

  const filtroMes =
    value("filtroMes");

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