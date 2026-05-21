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

  recibos: renderRecibos

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