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
  safeArray(data.associados)
    .slice(1)

      .map(a => ({

        id: a[0] || "",

        nome: a[1] || "",

        cpf: a[2] || "",

        telefone: a[3] || "",

        email: a[4] || "",

        endereco: a[5] || "",

        mensalidade: numero(a[6]),

        status: a[7] || "Ativo"

      }));

    state.cobrancas =
      safeArray(data.cobrancas)
      .slice(1);

    state.caixa =
      safeArray(data.caixa)
      .slice(1);

    state.recibos =
      safeArray(data.recibos)
      .slice(1);

    state.backups =
      safeArray(data.backups)
      .slice(1);

    state.fixas =
      safeArray(data.fixas)
      .slice(1);

    state.reservas =
      safeArray(data.reservas)
      .slice(1)
      .map(reservaObj);

    state.fechamentos =
      safeArray(data.fechamentos)
      .slice(1);

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