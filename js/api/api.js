/* ================= POST API ================= */

async function postAPI(dados){

  const res = await fetch(API,{
    method:"POST",
    body: JSON.stringify(dados)
  });

  return await res.json();
}


/* ================= CARREGAR ================= */
async function carregar(){

  try{

    const res = await fetch(API);

    if(!res.ok){
      throw new Error("Erro HTTP");
    }

    const data = await res.json();

    console.log("API:", data);

    if(data.erro){
      alert("Erro API: " + data.erro);
      return;
    }

    caixa =
      Array.isArray(data.caixa)
        ? data.caixa.slice(1)
        : [];

    associados =
      Array.isArray(data.associados)
        ? data.associados.slice(1)
        : [];

    cobrancas =
      Array.isArray(data.cobrancas)
        ? data.cobrancas.slice(1)
        : [];

    recibos =
      Array.isArray(data.recibos)
        ? data.recibos.slice(1)
        : [];

    fechamentos =
      Array.isArray(data.fechamentos)
        ? data.fechamentos.slice(1)
        : [];

    fixas =
      Array.isArray(data.fixas)
        ? data.fixas.slice(1)
        : [];

    backups =
      Array.isArray(data.backups)
        ? data.backups.slice(1)
        : [];

    render();

  }catch(e){

    console.error(e);

    alert("Erro de conexão com API");
  }
}