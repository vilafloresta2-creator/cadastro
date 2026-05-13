function render(){

  if(telaAtual === "dashboard"){
    renderDashboard();
  }

  if(telaAtual === "associados"){
    renderAssociados();
  }

  if(telaAtual === "cobrancas"){
    renderCobrancas();
  }

  if(telaAtual === "caixa"){
    renderCaixa();
  }

  if(telaAtual === "devedores"){
    renderDevedores();
  }

  if(telaAtual === "backups"){
    renderBackups();
  }

  if(telaAtual === "fixas"){
    renderFixas();
  }

  if(telaAtual === "relatorios"){
    renderRelatorios();
  }

}