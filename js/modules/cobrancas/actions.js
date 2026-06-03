/* =========================================
   COBRANCAS ACTIONS
========================================= */


/* ========== PAGAR ========== */
async function pagar(id){

  const item =
    safeArray(state.cobrancas)

      .find(item => {

        const c =
          cobrancaObj(item);

        return String(c.id)
          === String(id);

      });

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
    await pagarCobranca(id);

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
    await gerarCobrancasMes();

  if(!resp){
    return;
  }

  await carregar();
}