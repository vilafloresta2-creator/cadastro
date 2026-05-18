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
    SCREENS[telaAtual];

  if(
    typeof renderTela
    !== "function"
  ){

    telaAtual =
      "dashboard";

    renderDashboard();

    return;
  }

  renderTela();
}