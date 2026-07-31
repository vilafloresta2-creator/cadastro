/* ----------------------------------------------
              CAIXA SERVICE
---------------------------------------------- */

/* ========== SALVAR CAIXA ========== */
async function salvarCaixaAPI(
  dados,
  editando = false
){

  return await apiRequest({

    body:{

      acao:"lancar_caixa",

      ...dados

    },

    loading:

      editando
        ? "Atualizando lançamento..."
        : "Salvando lançamento...",

    sucesso:

      editando
        ? "Lançamento atualizado!"
        : "Lançamento salvo!",

    erro:
      "Erro ao salvar lançamento"

  });

}


/* ========== FECHAR MÊS ========== */
async function fecharMesAPI(mes){

  return await apiRequest({

    body:{

      acao:"fechar_mes",

      mes

    },

    loading:
      "Fechando mês...",

    sucesso:
      "Fechamento realizado!",

    erro:
      "Erro ao fechar mês"

  });

}


/* ========== EXCLUIR CAIXA ========== */
async function excluirCaixaAPI(id){

  return await apiRequest({

    body:{

      acao:"excluir_caixa",

      id

    },

    loading:
      "Excluindo lançamento...",

    sucesso:
      "Lançamento excluído!",

    erro:
      "Erro ao excluir lançamento"

  });

}