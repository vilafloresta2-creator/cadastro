/* =========================================
   COBRANCAS SERVICE
========================================= */


/* ========== PAGAR ========== */
async function pagarCobranca(id){

  return await apiRequest({

    body:{

      acao:"pagar",

      id
    },

    loading:
      "Registrando pagamento...",

    sucesso:
      "Pagamento registrado!",

    erro:
      "Erro ao registrar pagamento"
  });
}


/* ========== GERAR ========== */
async function gerarCobrancasMes(){

  return await apiRequest({

    body:{

      acao:
        "gerar_cobrancas"
    },

    loading:
      "Gerando cobranças...",

    sucesso:
      "Cobranças geradas!",

    erro:
      "Erro ao gerar cobranças"
  });
}