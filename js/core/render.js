/* =========================================
   RENDER
========================================= */


/* =========================================
   SCREENS
========================================= */

const SCREENS = {

  dashboard:
    renderDashboard,

  associados:
    renderAssociados,

  cobrancas:
    renderCobrancas,

  devedores:
    renderDevedores,

  caixa:
    renderCaixa,

  fixas:
    renderFixas,

  recibos:
    renderRecibos,

  relatorios:
    renderRelatorios,

  backups:
    renderBackups

};


/* ================= RENDER ================= */
function render(){

  const renderTela =
    SCREENS[state.telaAtual];

  if(
    typeof renderTela
    !== "function"
  ){

    state.telaAtual =
      "dashboard";

    renderDashboard();

    return;
  }

  renderTela();
}