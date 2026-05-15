function render(){

  switch(telaAtual){

    case "dashboard":
      renderDashboard();
      break;

    case "associados":
      renderAssociados();
      break;

    case "cobrancas":
      renderCobrancas();
      break;

    case "devedores":
      renderDevedores();
      break;

    case "caixa":
      renderCaixa();
      break;

    case "fixas":
      renderFixas();
      break;

    case "recibos":
      renderRecibos();
      break;

    case "relatorios":
      renderRelatorios();
      break;

    case "backups":
      renderBackups();
      break;

  }

}