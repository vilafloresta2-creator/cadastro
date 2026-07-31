/* -----------------------------------------
          ASSOCIADOS SERVICE
----------------------------------------- */

/* ========== SALVAR ========== */
async function salvarAssociadoAPI(
  dados,
  editando = false
){

  return await apiRequest({

    body:{

      acao:
        "salvar_associado",

      ...dados
    },

    loading:
      "Salvando associado...",

    sucesso:

      editando
        ? "Associado atualizado!"
        : "Associado cadastrado!",

    erro:
      "Erro ao salvar associado"
  });
}


/* ========== EXCLUIR ========== */
async function excluirAssociadoAPI(id){

  return await apiRequest({

    body:{
      acao:"excluir_associado",
      id
    },
    
    loading:
      "Excluindo associado...",

    sucesso:
      "Associado excluído!",

    erro:
      "Erro ao excluir associado"

  });

}


/* ========== MENSALIDADE ========== */
async function atualizarMensalidadeAPI(
  valor
){

  return await apiRequest({

    body:{

      acao:
        "mensalidade_todos",

      valor
    },

    loading:
      "Atualizando mensalidade...",

    sucesso:
      "Mensalidade atualizada!",

    erro:
      "Erro ao atualizar mensalidade"
  });
}