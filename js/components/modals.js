/* ================================= 
          MODALS
================================= */

/* =============== ABRIR MODAL =============== */
function abrirModal(){

  openModal("modal");

  focusInput("m_nome");
}


/* =============== FECHAR MODAL =============== */
function fecharModal(){

  closeModal("modal");

  limparFormularioAssociado();
}


/* ========= ABRIR MODAL MENSALIDADE ========= */
function abrirModalMensalidade(){

  const lista =
    safeArray(state.associados);

  if(!lista.length){

    showAlert(
      "Nenhum associado encontrado"
    );

    return;
  }

  const valor =
    numero(lista[0][6]);

  setText(
    "valorAtualMensalidade",
    moeda(valor)
  );

  setValue(
    "novoValorMensalidade",
    ""
  );

  openModal(
    "modalMensalidade"
  );
}


/* ========= FECHAR MODAL MENSALIDADE ========= */
function fecharModalMensalidade(){

  closeModal(
    "modalMensalidade"
  );
}