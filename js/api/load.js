/* =========================================
   LOAD DATA
========================================= */

async function carregar(){

  try{

    showLoading(
      "Carregando dados..."
    );

    const resp =
      await fetch(API_URL);

    const data =
      await resp.json();

    if(data.erro){

      throw new Error(
        data.erro
      );
    }

    state.associados =
      safeArray(data.associados);

    state.cobrancas =
      safeArray(data.cobrancas);

    state.caixa =
      safeArray(data.caixa);

    state.recibos =
      safeArray(data.recibos);

    state.backups =
      safeArray(data.backups);

    state.fixas =
      safeArray(data.fixas);

    state.reservas =
      safeArray(data.reservas);

    state.fechamentos =
      safeArray(data.fechamentos);

    return true;

  }catch(error){

    console.error(error);

    showToast(
      "Erro ao carregar dados",
      "error"
    );

    return false;

  }finally{

    hideLoading();
  }
}