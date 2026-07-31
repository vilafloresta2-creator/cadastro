/* ---------------------------------------------- 
              COBRANCAS ACTIONS
 ---------------------------------------------- */

/* ========== PAGAR ========== */
async function pagar(id){

  const item =

    safeArray(state.cobrancas)

      .map(cobrancaObj)

      .find(c =>

        String(c.id) === String(id)

      );

  if(!item){

    showToast(
      "Cobrança não encontrada",
      "error"
    );

    return;
  }

  const confirmado =
    await showConfirm(
      "Confirmar pagamento?"
    );

  if(!confirmado){
    return;
  }

  const resp =
    await pagarCobrancaAPI(id);

  if(!resp){
    return;
  }

  await carregar();

  listarCobrancas();

  gerarRecibo(
    item,
    resp.recibo
  );

}


/* ========== GERAR ========== */
async function gerarCobrancas(){

  const confirmado =
    await showConfirm(
      "Deseja gerar cobranças do mês atual?"
    );

  if(!confirmado){
    return;
  }

  const resp =
    await gerarCobrancasAPI();

  if(!resp){
    return;
  }

  await carregar();

  renderCobrancas();

}