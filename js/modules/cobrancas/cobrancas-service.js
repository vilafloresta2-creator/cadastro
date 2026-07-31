/* -----------------------------------------
          COBRANÇAS SERVICE
----------------------------------------- */

/* ========== PAGAR ========== */
function pagarCobrancaAPI(id){

  return apiRequest({

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


/* ========== GERAR COBRANÇAS ========== */
function gerarCobrancasAPI(){

  return apiRequest({

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