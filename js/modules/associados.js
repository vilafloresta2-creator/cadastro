/* ============= RENDER ASSOCIADO ============= */
function renderAssociados(){

  tela.innerHTML = `
    <div style="display:flex; gap:10px; margin-bottom:10px;">
      <input placeholder="Buscar..." id="busca" style="flex:1;">      
      <!-- <button class="btn" onclick="alterarMensalidadeTodos()">💰 Atualizar Mensalidade</button> -->
      <button class="btn" onclick="abrirModalMensalidade()">💰 Alterar Mensalidade</button>
    </div>
    <div id="lista"></div>
  `;

  document.getElementById("busca").oninput = listarAssociados;

  listarAssociados();
}


/* ============= LISTAR ASSOCIADO ============= */
function listarAssociados(){

  const busca = (
    document.getElementById("busca")?.value || ""
  ).toLowerCase();

  const lista = associados.filter(a =>
    String(a[1] || "").toLowerCase().includes(busca)
  );

  let html = "";

  lista.forEach(a=>{

    const status = statusAssociado(a[2]);

    const ativo =
    String(a[7] || "Ativo").trim() === "Ativo";

    html += `
      <div class="card" style="
        display:flex;
        justify-content:space-between;
        align-items:center;
      ">

        <div>

          <div style="
            font-size:18px;
            font-weight:600;
          ">
            ${a[1]}
          </div>

          <div style="
            font-size:13px;
            color:${
              !ativo
                ? "#9ca3af"
                : status==="Devedor"
                  ? "#ef4444"
                  : "#22c55e"
            };
          ">

            ${
              !ativo
                ? "⚫ Inativo"
                : status==="Devedor"
                  ? "🔴 Devedor"
                  : "🟢 Regular"
            }

          </div>

        </div>

        <div style="display:flex;gap:6px;">
          <button class="btn-edit btn-icon"
            onclick="editar('${a[0]}')">
            ✏️
          </button>

          <button class="btn-cancelar btn-icon"
            onclick="excluir('${a[0]}')">
            🗑️
          </button>
        </div>

      </div>
    `;
  });

  document.getElementById("lista").innerHTML = html;
}


/* ============== NOVO ASSOCIADO ============== */
function novo(){
  
  document.getElementById("modalTitulo").innerText = "Novo Associado";

  m_nome.value = "";
  m_cpf.value = "";
  m_tel.value = "";
  m_email.value = "";
  m_endereco.value = "";
  m_mensal.value = "";
  m_status.value = "Ativo";

  abrirModal();
}


/* ============= EDITAR ASSOCIADO ============= */
function editar(id){
  console.log("EDITANDO ID:", id); // debug

  const a = associados.find(x => String(x[0]) === String(id));

  if(!a){
    alert("Associado não encontrado");
    return;
  }

  editandoId = id;

  m_nome.value = String(a[1] || "").trim();
  m_cpf.value = maskCPF(String(a[2]).padStart(11,"0"));
  m_tel.value = a[3];
  m_email.value = String(a[4] || "").trim();
  m_endereco.value = String(a[5] || "").trim();
  m_mensal.value = a[6];
  m_status.value = a[7] || "Ativo";

  document.getElementById("modalTitulo").innerText = "Editar Associado";

  abrirModal();
}


/* ================= EXCLUIR ================= */
async function excluir(id){

  if(!confirm("Tem certeza que deseja excluir este associado?")){
    return;
  }

  try{

    const resp = await postAPI({
      acao:"excluir_associado",
      id
    });

    if(resp.erro){
      alert(resp.erro);
      return;
    }

    await carregar();

  }catch(e){

    console.error(e);

    alert("Erro ao excluir associado");
  }
}


/* ========= SALVAR MODAL MENSALIDADE ========= */
async function salvarMensalidade(){

  const valor =
    document.getElementById("novoValorMensalidade").value;

  if(!valor || Number(valor) <= 0){
    alert("Informe um valor válido");
    return;
  }

  if(!confirm(
    "Deseja aplicar esse valor para TODOS os associados?"
  )){
    return;
  }

  try{

    const resp = await postAPI({
      acao:"mensalidade_todos",
      valor
    });

    if(resp.erro){
      alert(resp.erro);
      return;
    }

    alert("Mensalidade atualizada!");

    fecharModalMensalidade();

    await carregar();

  }catch(e){

    console.error(e);

    alert("Erro ao atualizar mensalidade");
  }
}


/* =============== SALVAR MODAL =============== */
async function salvarModal(){

  if(!validarCampos()){
    alert("Preencha corretamente");
    return;
  }

  const btn = document.getElementById("btnSalvar");

  btn.classList.add("btn-loading");
  btn.innerText = "Salvando...";

  try{

    const resp = await postAPI({      
        acao:"salvar_associado",
        id: editandoId,
        nome: String(m_nome.value).trim(),
        cpf: m_cpf.value.replace(/\D/g,""),
        telefone: m_tel.value.replace(/\D/g,""),
        email: String(m_email.value).trim(),
        endereco: String(m_endereco.value).trim(),
        mensalidade: m_mensal.value,
        status: m_status.value      
    });    

    if(resp.erro){
      alert(resp.erro);
      return;
    }

    fecharModal();

    await carregar();

  }catch(e){
    console.error(e);
    alert("Erro ao salvar");
    }finally{

  btn.classList.remove("btn-loading");
  btn.innerText = "Salvar";
  }
}


/* ================= ALTERAR MENSALIDADE ================= */
async function alterarMensalidadeTodos(){

  const valor =
    prompt("Novo valor da mensalidade:");

  if(!valor){
    return;
  }

  if(isNaN(valor)){
    alert("Valor inválido");
    return;
  }

  if(!confirm(
    "Atualizar mensalidade de TODOS os associados?"
  )){
    return;
  }

  try{

    const resp = await postAPI({
      acao:"mensalidade_todos",
      valor
    });

    if(resp.erro){
      alert(resp.erro);
      return;
    }

    alert("Mensalidade atualizada!");

    await carregar();

  }catch(e){

    console.error(e);

    alert("Erro ao atualizar mensalidade");
  }
}