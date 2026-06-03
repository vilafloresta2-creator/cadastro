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

  const associado =
    lista[0];

  if(!associado){

    showAlert(
      "Nenhum associado encontrado"
    );

    return;
  }

  const valor =
    numero(
      associado.mensalidade
    );

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