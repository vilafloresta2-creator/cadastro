/* ----------------------------------------
            LOAD DATA
---------------------------------------- */


/* ========== CARREGAR DADOS ========== */
async function carregar(){

  const resp =
    await apiRequest({

      method:
        "GET",

      loading:
        "Carregando dados...",

      erro:
        "Erro ao carregar dados"

    });


  if(!resp){

    return false;

  }


  try{

    /* =========================================
                    ASSOCIADOS
    ========================================= */

    state.associados =

      safeArray(
        resp.associados
      )

        .slice(1)

        .map(
          associadoObj
        );


    /* =========================================
                    COBRANÇAS
    ========================================= */

    state.cobrancas =

      safeArray(
        resp.cobrancas
      )

        .slice(1)

        .map(
          cobrancaObj
        );


    /* =========================================
                      CAIXA
    ========================================= */

    state.caixa =

      safeArray(
        resp.caixa
      )

        .slice(1)

        .map(
          caixaObj
        );


    /* =========================================
                    RECIBOS
    ========================================= */

    state.recibos =

      safeArray(
        resp.recibos
      )

        .slice(1)

        .map(
          reciboObj
        );


    /* =========================================
                    BACKUPS
    ========================================= */

    state.backups =

      safeArray(
        resp.backups
      )

        .slice(1)

        .map(
          backupObj
        );


    /* =========================================
                      FIXAS
    ========================================= */

    state.fixas =

      safeArray(
        resp.fixas
      )

        .slice(1)

        .map(
          fixaObj
        );


    /* =========================================
                    RESERVAS
    ========================================= */

    state.reservas =

      safeArray(
        resp.reservas
      )

        .slice(1)

        .map(
          reservaObj
        );


    /* =========================================
                  FECHAMENTOS
    ========================================= */

    state.fechamentos =

      safeArray(
        resp.fechamentos
      )

        .slice(1);


    return true;


  }catch(error){

    console.error(
      "LOAD ERROR:",
      error
    );


    showToast(
      "Erro ao processar dados",
      "error"
    );


    return false;

  }

}