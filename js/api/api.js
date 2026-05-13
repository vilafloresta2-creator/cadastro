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
async function gerarCobrancas(){

  await fetch(API,{
    method:"POST",
    body: JSON.stringify({acao:"gerar_cobrancas"})
  });

  carregar();
}

/* ================= SALVAR DESPESAS FIXAS ================= */
async function salvarFixa(){

  const categoria =
    document.getElementById("fx_categoria").value;

  const descricao =
    document.getElementById("fx_descricao").value;

  const valor =
    document.getElementById("fx_valor").value;

  const dia =
    document.getElementById("fx_dia").value;

  if(!categoria || !descricao || !valor || !dia){
    alert("Preencha os campos");
    return;
  }

  await fetch(API,{
    method:"POST",
    body: JSON.stringify({
      acao:"salvar_fixa",
      categoria,
      descricao,
      valor,
      dia
    })
  });

  await carregar();

  renderFixas();
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

/* ============ 💾 SALVAR CAIXA =================== */
async function salvarCaixa(){

  const tipo = document.getElementById("cx_tipo").value;
  const categoria = document.getElementById("cx_categoria").value;
  const descricao = document.getElementById("cx_descricao").value;
  const valor = document.getElementById("cx_valor").value;

  if(!categoria || !descricao || !valor){
    alert("Preencha os campos");
    return;
  }

  await fetch(API,{
    method:"POST",
    body: JSON.stringify({
      acao:"lancar_caixa",
      id: editandoCaixa,
      tipo,
      categoria,
      descricao,
      valor
    })
  });

  editandoCaixa = null;
  document.getElementById("cx_categoria").value = "";
  document.getElementById("cx_descricao").value = "";
  document.getElementById("cx_valor").value = "";

  await carregar();
  renderCaixa();
}

/* ================= EXCLUIR CAIXA ================= */
async function excluirCaixa(id){

  if(!confirm("Excluir lançamento?")){
    return;
  }

  await fetch(API,{
    method:"POST",
    body: JSON.stringify({
      acao:"excluir_caixa",
      id
    })
  });

  await carregar();
  renderCaixa();
}

/* INIT */
async function init(){
  await carregar();
  ir("dashboard");
}

init();

/* ================= FECHAR MES ================= */
async function fecharMes(){

  const mes = prompt("Informe o mês (MM-YYYY)");

  if(!mes) return;

  if(!confirm("Fechar mês " + mes + "?")){
    return;
  }

  const res = await fetch(API,{
    method:"POST",
    body: JSON.stringify({
      acao:"fechar_mes",
      mes
    })
  });

  const resp = await res.json();

  if(resp.erro){
    alert(resp.erro);
    return;
  }

  alert("Fechamento realizado!");

  carregar();
}

/* ================= RESTAURAR BACKUP ================= */
async function restaurarBackup(url){

  if(!confirm("⚠️ Isso vai substituir TODOS os dados. Continuar?")) return;

  await fetch(API,{
    method:"POST",
    body: JSON.stringify({
      acao:"restore",
      url
    })
  });

  alert("Backup restaurado!");
  carregar();
}

/* ============ 💾 SALVAR MODAL MENSALIDADE =================== */
async function salvarMensalidade(){

  const valor = document.getElementById("novoValorMensalidade").value;

  if(!valor || Number(valor) <= 0){
    alert("Informe um valor válido");
    return;
  }

  if(!confirm("Deseja aplicar esse valor para TODOS os associados?")){
    return;
  }

  await fetch(API,{
    method:"POST",
    body: JSON.stringify({
      acao:"mensalidade_todos",
      valor: valor
    })
  });

  alert("Mensalidade atualizada!");

  fecharModalMensalidade();
  carregar(); // atualiza tela
}

/* ================= SALVAR MODAL ================= */
async function salvarModal(){

  if(!validarCampos()){
    alert("Preencha corretamente");
    return;
  }

  const btn = document.getElementById("btnSalvar");

  btn.classList.add("btn-loading");
  btn.innerText = "Salvando...";

  try{

    const res = await fetch(API,{
      method:"POST",
      body: JSON.stringify({
        acao:"salvar_associado",
        id: editandoId,
        nome: m_nome.value,
        cpf: m_cpf.value.replace(/\D/g,""),
        telefone: m_tel.value.replace(/\D/g,""),
        email: m_email.value,
        endereco: m_endereco.value,
        mensalidade: m_mensal.value,
        status: m_status.value
      })
    });

    const resp = await res.json();

    if(resp.erro){
      alert(resp.erro);
      return;
    }

    fecharModal();

    await carregar();

  }catch(e){
    console.error(e);
    alert("Erro ao salvar");
  }

  btn.classList.remove("btn-loading");
  btn.innerText = "Salvar";
}

/* ================= ALTERAR MENSALIDADE ================= */
async function alterarMensalidadeTodos(){

  const valor = prompt("Novo valor da mensalidade:");

  if(!valor) return;

  if(isNaN(valor)){
    alert("Valor inválido");
    return;
  }

  if(!confirm("Atualizar mensalidade de TODOS os associados?")) return;

  await fetch(API,{
    method:"POST",
    body: JSON.stringify({
      acao:"mensalidade_todos",
      valor: valor
    })
  });

  alert("Mensalidade atualizada!");
  carregar();
}