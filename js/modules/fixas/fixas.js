/* ----------------------------------------------
                  FIXAS
---------------------------------------------- */


/* ========== NOVA FIXA ========== */
function abrirNovaFixa(){

  state.editandoFixaId = null;

  abrirFixaModal();

}


/* ========== EDITAR ========== */
function editarFixa(id){

  const fixa =

    safeArray(state.fixas)

      .map(fixaObj)

      .find(f =>

        String(f.id)
        ===
        String(id)

      );


  if(!fixa){

    return;

  }


  abrirFixaModal(
    fixa
  );

}


/* ========== EXCLUIR ========== */
async function excluirFixa(id){

  const confirmado =

    await showConfirm(
      "Deseja excluir esta despesa fixa?"
    );


  if(!confirmado){

    return;

  }


  const ok =

    await excluirFixaAPI(
      id
    );


  if(!ok){

    return;

  }


  limparModalPrincipal();

  await carregar();

  renderFixas();

}