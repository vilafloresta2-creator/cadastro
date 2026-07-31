/* ----------------------------------------------
                  BACKUPS SERVICE
---------------------------------------------- */

/* =============== FAZER BACKUP =============== */
async function fazerBackupAPI(){

  return await apiRequest({

    body:{

      acao:"backup"

    },

    loading:
      "Gerando backup...",

    sucesso:
      "Backup criado com sucesso!",

    erro:
      "Erro ao gerar backup"

  });

}


/* ============= RESTAURAR BACKUP ============= */
async function restaurarBackupAPI(url){

  return await apiRequest({

    body:{

      acao:"restore",

      url

    },

    loading:
      "Restaurando backup...",

    sucesso:
      "Backup restaurado!",

    erro:
      "Erro ao restaurar backup"

  });

}








