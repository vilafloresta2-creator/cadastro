/* ================= RENDER ASSOCIADOS ================= */
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

/* ================= LISTAR ASSOCIADOS ================= */
function listarAssociados(){

  const busca = document.getElementById("busca")
    .value
    .toLowerCase();

  let lista = associados.filter(a =>
    String(a[1] || "").toLowerCase().includes(busca)
  );

  let html = "";

  lista.forEach(a=>{

    const status = statusAssociado(a[2]);

    const ativo =
      (a[7] || "Ativo") === "Ativo";

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
                : status=="Devedor"
                  ? "#ef4444"
                  : "#22c55e"
            };
          ">

            ${
              !ativo
                ? "⚫ Inativo"
                : status=="Devedor"
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

/* ================= NOVO ASSOCIADO ================= */
function novo(){
  editandoId = null;

  modalTitulo.innerText = "Novo Associado";

  m_nome.value = "";
  m_cpf.value = "";
  m_tel.value = "";
  m_email.value = "";
  m_endereco.value = "";
  m_mensal.value = "";
  m_status.value = "Ativo";

  abrirModal();
}

/* ================= EDITAR ASSOCIADO ================= */
function editar(id){
  console.log("EDITANDO ID:", id); // debug

  const a = associados.find(x=>x[0]==id);

  if(!a){
    alert("Associado não encontrado");
    return;
  }

  editandoId = id;

  m_nome.value = a[1];
  m_cpf.value = maskCPF(String(a[2]).padStart(11,"0"));
  m_tel.value = a[3];
  m_email.value = a[4] || "";
  m_endereco.value = a[5] || "";
  m_mensal.value = a[6];
  m_status.value = a[7] || "Ativo";

  modalTitulo.innerText = "Editar Associado";

  abrirModal();
}

/* ================= ABRIR MODAL ================= */
let editandoId = null;

function abrirModal(){
  document.getElementById("modal").classList.add("show");

  setTimeout(()=> m_nome.focus(),150);
}

/* ================= FECHAR MODAL ================= */
function fecharModal(){
  modal.classList.remove("show");

  // limpa campos
  m_nome.value = "";
  m_cpf.value = "";
  m_tel.value = "";
  m_email.value = "";
  m_endereco.value = "";
  m_mensal.value = "";

  editandoId = null;
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