/* =========================================
   RENDER
========================================= */


/* =========================================
   SCREENS
========================================= */

const SCREENS = {

  dashboard: renderDashboard,

  associados: renderAssociados,

  devedores: renderDevedores,

  cobrancas: renderCobrancas,

  caixa: renderCaixa,

  reservas: renderReservas,

  fixas: renderFixas,

  relatorios: renderRelatorios,

  backups: renderBackups,

  agenda: renderAgenda,

  recibos: renderRecibos

};


/* =========================================
   FALLBACK
========================================= */

const DEFAULT_SCREEN =
  "dashboard";


/* ================= RENDER ================= */
function render(){

  try{

    const telaAtual =

      String(
        state.telaAtual
        || DEFAULT_SCREEN
      ).trim();

    const renderTela =
      SCREENS[telaAtual];


    /* =========================================
       TELA INVÁLIDA
    ========================================= */

    if(
      typeof renderTela
      !== "function"
    ){

      console.warn(
        "Tela inválida:",
        telaAtual
      );

      state.telaAtual =
        DEFAULT_SCREEN;

      return render();
    }


    /* =========================================
       LIMPA SCROLL
    ========================================= */

    window.scrollTo({
      top:0,
      behavior:"smooth"
    });


    /* =========================================
                    RENDER
    ========================================= */
    renderTela();
    
    atualizarFAB();

  }catch(error){

    console.error(
      "RENDER ERROR:",
      error
    );

    tela.innerHTML = `

      <div class="card">

        <h3>
          Erro ao carregar tela
        </h3>

        <div style="
          margin-top:10px;
          opacity:.7;
        ">

          ${error.message}

        </div>

        <button
          class="btn"
          style="margin-top:15px;"
          onclick="ir('${DEFAULT_SCREEN}')"
        >
          Voltar
        </button>

      </div>

    `;

    showToast?.(
      "Erro ao renderizar tela",
      "error"
    );
  }
}

/* =========================================
                FAB
    ========================================= */
function atualizarFAB(){

  const fab =
    document.getElementById("fab");

  if(!fab){
    return;
  }

  fab.style.display = "none";

  fab.onclick = null;

  switch(state.telaAtual){

    case "associados":

      fab.style.display = "";

      fab.onclick = () => novo();

    break;

    case "fixas":

      fab.style.display = "";

      fab.onclick = () => abrirModalFixa();

    break;

    case "agenda":

      fab.style.display = "";

      fab.onclick = () => abrirFormularioReserva();

    break;

  }

}