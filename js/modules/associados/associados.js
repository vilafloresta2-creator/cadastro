/* =========================================
   ASSOCIADOS
========================================= */


/* ============= NOVO ASSOCIADO ============= */
function novo(){

  state.editandoId = null;

  setText(
    "modalTitulo",
    "Novo Associado"
  );

  limparFormularioAssociado();

  abrirModal();
}


/* ============= EDITAR ASSOCIADO ============= */
function editar(id){

  const associado =

  safeArray(state.associados)

    .find(x => {

      const a = x;
        
      return String(a.id)
        === String(id);

    });

  if(!associado){

    showToast(
      "Associado não encontrado",
      "error"
    );

    return;
  }

  state.editandoId =
    String(id);

  setText(
    "modalTitulo",
    "Editar Associado"
  );

  preencherFormularioAssociado(
    associado
  );

  limparErrosCampos?.();

  abrirModal();
}


/* ================= EXCLUIR ================= */
async function excluir(id){

  const ok =
    await excluirAssociado(id);

  if(!ok){
    return;
  }

  await carregar();
  listarAssociados();
}


/* ========= SALVAR MENSALIDADE ========= */
async function salvarMensalidade(){

  const ok =
    await atualizarMensalidade();

  if(!ok){
    return;
  }

  fecharModalMensalidade();

  await carregar();
}