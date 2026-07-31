/* ----------------------------------------------
              FIXAS SERVICE
---------------------------------------------- */


/* ========== SALVAR ========== */
async function salvarFixaAPI(dados){

  return await apiRequest({

    body:{

      acao:"salvar_fixa",

      ...dados

    },

    loading:
      "Salvando despesa fixa...",

    sucesso:
      "Despesa fixa salva!",

    erro:
      "Erro ao salvar despesa fixa"

  });

}


/* ========== EXCLUIR ========== */
async function excluirFixaAPI(id){

  return await apiRequest({

    body:{

      acao:"excluir_fixa",

      id

    },

    loading:
      "Excluindo despesa fixa...",

    sucesso:
      "Despesa fixa excluída!",

    erro:
      "Erro ao excluir despesa fixa"

  });

}