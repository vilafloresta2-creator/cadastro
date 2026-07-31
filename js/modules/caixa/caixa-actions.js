/* ----------------------------------------------
                  CAIXA ACTIONS
---------------------------------------------- */

/* =============== EDITAR CAIXA =============== */
function editarCaixa(id){

  const item =
    safeArray(state.caixa)
      .find(c => {

        const caixa =
          caixaObj(c);

        return (

          String(caixa.id)

          ===

          String(id)

        );

      });

  if(!item){

    showToast(
      "Lançamento não encontrado",
      "error"
    );

    return;
  }

  abrirCaixaModal(
    caixaObj(item)
  );
}


/* ============== EXCLUIR CAIXA ============== */
async function excluirCaixa(id){

  const confirmado =
    await showConfirm(
      "Excluir lançamento?"
    );

  if(!confirmado){
    return;
  }

  const ok =
    await excluirCaixaAPI(id);

  if(!ok){
    return;
  }

  await carregar();

  renderCaixa();

}


/* ========== CANCELAR EDIÇÃO ========== */
function cancelarEdicaoCaixa(){

  state.editandoCaixa =
    null; 

  renderCaixa();
}


/* =============== SALVAR CAIXA MODAL =============== */
async function salvarCaixaModal(){

  const dados =
    obterDadosCaixaForm();

  if(
    !dados.categoria ||
    !dados.descricao ||
    !valorPositivo(dados.valor)
  ){

    showToast(
      "Preencha os campos corretamente",
      "warning"
    );

    return;
  }

  const ok =
    await salvarCaixaAPI({

      id: state.editandoCaixa,

      tipo: dados.tipo,
      categoria: dados.categoria,
      descricao: dados.descricao,
      valor: dados.valor

    },

    !!state.editandoCaixa
  );

  if(!ok){
    return;
  }

  state.editandoCaixa =
    null;

  limparModalPrincipal();

  await carregar();

  renderCaixa();
}


/* ========== FECHAR MÊS ========== */
async function fecharMes(){

  const mes = window.prompt(
    "Informe o mês (YYYY-MM)"
  );

  if(!mes){
    return;
  }

  const texto =
    String(mes).trim();

  if(
    !/^\d{4}-\d{2}$/.test(texto)
  ){

    showToast(
      "Formato inválido. Use YYYY-MM",
      "warning"
    );

    return;
  }

  const confirmado =
    await showConfirm(
      `Fechar mês ${texto}?`
    );

  if(!confirmado){
    return;
  }

  const ok =
    await fecharMesAPI(texto);

  if(!ok){
    return;
  }

  await carregar();

  renderCaixa();

}