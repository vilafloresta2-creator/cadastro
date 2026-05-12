/* ================= CARREGAR ================= */
async function carregar(){
  try{
    let res = await fetch(API);
    let data = await res.json();

    console.log("API:", data); // 🔍 debug

    if(data.erro){
      alert("Erro API: " + data.erro);
      return;
    }

    // 🔥 BLINDAGEM TOTAL (resolve seu erro)
    caixa = Array.isArray(data.caixa) ? data.caixa.slice(1) : [];
    associados = Array.isArray(data.associados) ? data.associados.slice(1) : [];
    cobrancas  = Array.isArray(data.cobrancas)  ? data.cobrancas.slice(1)  : [];
    recibos    = Array.isArray(data.recibos)    ? data.recibos.slice(1)    : [];
    fechamentos = Array.isArray(data.fechamentos) ? data.fechamentos.slice(1) : [];
    fixas = Array.isArray(data.fixas) ? data.fixas.slice(1) : [];
    backups = Array.isArray(data.backups) ? data.backups.slice(1) : [];

    render();

  }catch(e){
    console.error(e);
    alert("Erro de conexão com API");
  }
}

/* ================= PAGAR ================= */
async function pagar(id){

  const item = cobrancas.find(c=>c[0]==id);
  if(!item) return;

  // envia pro backend
  const res = await fetch(API,{
    method:"POST",
    body: JSON.stringify({acao:"pagar",id})
  });

  const resp = await res.json();

  const numero = resp.recibo;

  // 🔥 ATUALIZA TUDO (SEM F5)
  await carregar();

  // 🔥 gera recibo depois de atualizar
  gerarRecibo(item, numero);
}

/* ================= GERAR COBRANÇA ================= */
let gerandoCobrancas = false;

async function gerarCobrancas(){

  const btn = event?.target;
  if(btn){
    btn.disabled = true;
    btn.innerText = "Gerando...";
  }

  try{

    await fetch(API,{
      method:"POST",
      body: JSON.stringify({
        acao:"gerar_cobrancas"
      })
    });

    await carregar();
    renderCobrancas();

  }catch(e){
    console.error(e);
    alert("Erro ao gerar cobranças");
  }
}

/* ================= SALVAR ================= */
async function salvar(obj){

  await fetch(API,{
    method:"POST",
    body:JSON.stringify({
      acao:"salvar_associado",
      ...obj
    })
  });

  carregar();
}

/* ================= EXCLUIR ================= */
async function excluir(id){

  if(!confirm("Tem certeza que deseja excluir este associado?")) return;

  await fetch(API,{
    method:"POST",
    body: JSON.stringify({
      acao:"excluir_associado",
      id: id
    })
  });
  carregar();
}

/* ================= BACKUP ================= */
async function fazerBackup(ev){

  let btn = ev?.target;

  if(btn){
    btn.innerText = "Salvando...";
    btn.disabled = true;
  }

  try{
    const res = await fetch(API,{
      method:"POST",
      body: JSON.stringify({acao:"backup"})
    });

    const data = await res.json();

    if(data.erro){
      alert(data.erro);
      return;
    }

    // 🔥 ATUALIZA LISTA DE BACKUPS
    await carregar();

    if(confirm("Backup criado! Deseja abrir agora?")){
      window.open(data.url, "_blank");
    }

  }catch(e){
    alert("Erro ao gerar backup");
  }

  if(btn){
    btn.innerText = "💾 Fazer Backup";
    btn.disabled = false;
  }
}

document.addEventListener("keydown", (e)=>{
  if(e.key === "Escape"){
    fecharModal();
    fecharModalMensalidade();
  }
});