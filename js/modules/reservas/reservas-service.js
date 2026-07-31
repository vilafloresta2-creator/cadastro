/* ----------------------------------------------
              RESERVA SERVICE
---------------------------------------------- */


/* ============== EXCLUIR RESERVA ============== */
async function excluirReservaAPI(id){

  return await apiRequest({

    body:{
      acao:"excluir_reserva",
      id
    },

    loading:
      "Excluindo reserva...",

    sucesso:
      "Reserva excluída!",

    erro:
      "Erro ao excluir reserva"

  });

}


/* ========== SALVAR RESERVA ========== */
async function salvarReservaAPI(
  dados,
  editando = false
){

  return await apiRequest({

    body:{

      acao:"salvar_reserva",

      ...dados

    },

    loading:
      "Salvando reserva...",

    sucesso:

      editando
        ? "Reserva atualizada"
        : "Reserva criada",

    erro:
      "Erro ao salvar reserva"

  });

}