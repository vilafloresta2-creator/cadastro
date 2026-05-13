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

/* ========= ABRIR MODAL MENSALIDADE ======== */
function abrirModalMensalidade(){

  if(!associados.length){
    alert("Nenhum associado encontrado");
    return;
  }

  const valor = Number(associados[0][6] || 0);

  document.getElementById("valorAtualMensalidade")
    .innerText = "R$ " + valor.toFixed(2);

  document.getElementById("novoValorMensalidade").value = "";

  document.getElementById("modalMensalidade")
    .classList.add("show");
}



/* ============ ❌ FECHAR MODAL MENSALIDADE =================== */
function fecharModalMensalidade(){
  document.getElementById("modalMensalidade")
    .classList.remove("show");
}