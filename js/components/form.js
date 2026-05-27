/* =========================================
   FORM HELPERS
========================================= */


/* ========== PEGAR VALOR ========== */
function getValue(id){

  return String(

    document.getElementById(id)
      ?.value || ""

  ).trim();
}


/* ========== SETAR VALOR ========== */
function setValue(id, valor = ""){

  const el =
    document.getElementById(id);

  if(!el){
    return;
  }

  el.value = valor;
}


/* ========== LIMPAR FORM ========== */
function limparFormulario(ids = []){

  ids.forEach(id => {

    setValue(id, "");

  });
}


/* ========== DESABILITAR BOTAO ========== */
function setButtonLoading(
  id,
  loading = true,
  texto = "Salvando..."
){

  const btn =
    document.getElementById(id);

  if(!btn){
    return;
  }

  if(loading){

    btn.dataset.originalText =
      btn.innerText;

    btn.disabled = true;

    btn.innerText = texto;

    btn.classList.add(
      "btn-loading"
    );

    return;
  }

  btn.disabled = false;

  btn.innerText =
    btn.dataset.originalText || "Salvar";

  btn.classList.remove(
    "btn-loading"
  );
}


/* ========== PEGAR NUMERO ========== */
function getNumero(id){

  return numero(
    getValue(id)
  );
}


/* ========== PEGAR CPF ========== */
function getCPF(id){

  return limparCPF(
    getValue(id)
  );
}


/* ========== PEGAR TELEFONE ========== */
function getTelefone(id){

  return getValue(id)
    .replace(/\D/g,"");
}