/* ================= MASCARA CPF ================= */
function maskCPF(v){
  v = String(v || "");
  v = v.replace(/\D/g,"").slice(0,11);
  v = v.replace(/(\d{3})(\d)/,"$1.$2");
  v = v.replace(/(\d{3})(\d)/,"$1.$2");
  v = v.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
  return v;
}

/* ================= MASCARA TELEFONE ================= */
function maskTel(v){
  v = String(v || "");
  v = v.replace(/\D/g,"").slice(0,11);

  if(v.length > 10){
    v = v.replace(/(\d{2})(\d{5})(\d)/,"($1) $2-$3");
  }else{
    v = v.replace(/(\d{2})(\d{4})(\d)/,"($1) $2-$3");
  }

  return v;
}

/* ================= NORMALIZAR CPF ================= */
function normalizarCPF(cpf){
  return String(cpf || "")
    .replace(/\D/g,"")
    .padStart(11,"0");
}

document.addEventListener("input", e=>{
  if(e.target.id === "m_cpf"){
    e.target.value = maskCPF(e.target.value);
  }

  if(e.target.id === "m_tel"){
    e.target.value = maskTel(e.target.value);
  }
});