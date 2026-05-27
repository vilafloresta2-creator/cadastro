/* =========================================
   API REQUEST
========================================= */


/* ========== REQUEST PADRAO ========== */
async function apiRequest({

  body = {},
  loading = "",
  sucesso = "",
  erro = "Erro inesperado"

}){

  if(loading){

    showLoading(loading);
  }

  try{

    const resp =
      await postAPI(body);

    if(resp?.erro){

      showToast(
        resp.erro,
        "error"
      );

      return null;
    }

    if(sucesso){

      showToast(
        sucesso,
        "success"
      );
    }

    return resp;

  }catch(error){

    console.error(error);

    showToast(
      erro,
      "error"
    );

    return null;

  }finally{

    hideLoading();
  }
}