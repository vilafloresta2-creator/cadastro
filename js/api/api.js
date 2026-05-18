/* =========================================
   API
========================================= */


/* ================= POST API ================= */
async function postAPI(dados = {}){

  try{

    const response = await fetch(API_URL, {
      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify(dados)
    });

    if(!response.ok){

      throw new Error(
        `Erro HTTP ${response.status}`
      );
    }

    const json =
      await response.json();

    return json;

  }catch(error){

    console.error(
      "POST API ERROR:",
      error
    );

    return {
      erro:"Erro de conexão com servidor"
    };
  }
}


/* ================= CARREGAR ================= */
async function carregar(
  exibirLoading = false
){

  try{

    if(
      exibirLoading
      &&
      typeof showLoading === "function"
    ){

      showLoading(
        "Carregando sistema..."
      );
    }

    const response =
      await fetch(API_URL);

    if(!response.ok){

      throw new Error(
        `Erro HTTP ${response.status}`
      );
    }

    const data =
      await response.json();

    console.log(
      "API:",
      data
    );

    if(data.erro){

      showToast?.(
        data.erro,
        "error"
      );

      return;
    }

    /* =========================================
       STATE
    ========================================= */

    state.caixa =
      safeArray(data.caixa)
        .slice(1);

    state.associados =
      safeArray(data.associados)
        .slice(1);

    state.cobrancas =
      safeArray(data.cobrancas)
        .slice(1);

    state.recibos =
      safeArray(data.recibos)
        .slice(1);

    state.fechamentos =
      safeArray(data.fechamentos)
        .slice(1);

    state.fixas =
      safeArray(data.fixas)
        .slice(1);

    state.backups =
      safeArray(data.backups)
        .slice(1);

    render();

  }catch(error){

    console.error(
      "LOAD API ERROR:",
      error
    );

    showToast?.(
      "Erro de conexão com API",
      "error"
    );

  }finally{

    if(
      exibirLoading
      &&
      typeof hideLoading === "function"
    ){

      hideLoading();
    }
  }
}