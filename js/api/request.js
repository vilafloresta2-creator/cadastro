/* ----------------------------------------
            API REQUEST
---------------------------------------- */


/* ========== REQUEST PADRAO ========== */
async function apiRequest({

  method = "POST",

  body = {},

  loading = "",

  sucesso = "",

  erro = "Erro inesperado"

} = {}){


  if(loading){

    showLoading(
      loading
    );

  }


  try{

    let resp;


    /* =========================================
                      GET
    ========================================= */

    if(
      String(method)
        .toUpperCase()
        ===
      "GET"
    ){

      const response =
        await fetch(
          API_URL
        );


      if(!response.ok){

        throw new Error(
          `HTTP ${response.status}`
        );

      }


      resp =
        await response.json();

    }


    /* =========================================
                      POST
    ========================================= */

    else{

      resp =
        await postAPI(
          body
        );

    }


    /* =========================================
                    ERRO API
    ========================================= */

    if(resp?.erro){

      showToast(
        resp.erro,
        "error"
      );

      return null;

    }


    /* =========================================
                    SUCESSO
    ========================================= */

    if(sucesso){

      showToast(
        sucesso,
        "success"
      );

    }


    return resp;


  }catch(error){

    console.error(
      "API REQUEST ERROR:",
      error
    );


    showToast(
      erro,
      "error"
    );


    return null;


  }finally{

    hideLoading();

  }

}