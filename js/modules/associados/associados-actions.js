/* ---------------------------------------------- 
             ASSOCIADOS ACTIONS
 ---------------------------------------------- */

/* ============= NOVO ============= */
function novoAssociado(){
  abrirAssociadoModal();
}


/* ============= EDITAR ============= */
function editarAssociado(id){

  const associado =

    safeArray(state.associados)

      .find(a =>

        String(a.id)
          === String(id)

      );

  if(!associado){

    showToast(
      "Associado não encontrado",
      "error"
    );

    return;
  }

  abrirAssociadoModal(
    associado
  );
}


/* ============= EXCLUIR ============= */
async function excluirAssociado(id){

  const associado =

    safeArray(state.associados)

      .find(a =>

        String(a.id) === String(id)

      );

  const confirmar = await showConfirm(

    `Excluir associado?\n\n${associado?.nome || ""}`

  );

  if(!confirmar){
    return;
  }

  const ok =
    await excluirAssociadoAPI(id);

  if(!ok){
    return;
  }

  showToast(
    "Associado excluído com sucesso",
    "success"
  );

  await carregar();
   
  renderAssociados();
}


/* ========= SALVAR MENSALIDADE ========= */
async function salvarMensalidade(){

  const valor = numero(
    getValue(
      "novoValorMensalidade"
    )
  );

  if(!valor){

    showToast(
      "Informe um valor válido",
      "warning"
    );

    return;
  }

  const ok =
    await atualizarMensalidadeAPI(
      valor
    );

  if(!ok){
    return;
  }

  limparModalPrincipal();

  await carregar();

  renderAssociados();
}