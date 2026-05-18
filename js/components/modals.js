/* =============== ABRIR MODAL =============== */
function abrirModal(){

  const modal =
    document.getElementById("modal");

  if(!modal){
    return;
  }

  modal.classList.add("show");

  setTimeout(() => {

    const campo =
      document.getElementById("m_nome");

    if(campo){
      campo.focus();
    }

  }, 150);
}


/* =============== FECHAR MODAL =============== */
function fecharModal(){

  const modal =
    document.getElementById("modal");

  if(modal){
    modal.classList.remove("show");
  }

  const campos = [
    "m_nome",
    "m_cpf",
    "m_tel",
    "m_email",
    "m_endereco",
    "m_mensal"
  ];

  campos.forEach(id => {

    const el =
      document.getElementById(id);

    if(el){
      el.value = "";
    }

  });

  state.editandoId = null;
}


/* ========= ABRIR MODAL MENSALIDADE ========= */
function abrirModalMensalidade(){

  const lista =
    safeArray(state.associados);

  if(!lista.length){

    alert("Nenhum associado encontrado");
    return;
  }

  const valor =
    numero(lista[0][6]);

  const valorAtual =
    document.getElementById("valorAtualMensalidade");

  const novoValor =
    document.getElementById("novoValorMensalidade");

  const modal =
    document.getElementById("modalMensalidade");

  if(valorAtual){
    valorAtual.innerText =
      moeda(valor);
  }

  if(novoValor){
    novoValor.value = "";
  }

  if(modal){
    modal.classList.add("show");
  }
}


/* ========= FECHAR MODAL MENSALIDADE ========= */
function fecharModalMensalidade(){

  const modal =
    document.getElementById("modalMensalidade");

  if(modal){
    modal.classList.remove("show");
  }
}