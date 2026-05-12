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

/* ================= FORMATAR DATA ================= */
function formatarData(dataISO){
  if(!dataISO) return "-";
  const d = new Date(dataISO);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

/* ================= FORMATAR MÊS ================= */
function formatarMes(valor){

  if(!valor) return "";

  valor = String(valor).trim();

  // yyyy-MM
  if(/^\d{4}-\d{2}$/.test(valor)){

    const [ano, mes] = valor.split("-");

    return mes + "-" + ano;
  }

  // MM-yyyy
  if(/^\d{2}-\d{4}$/.test(valor)){
    return valor;
  }

  const d = new Date(valor);

  if(isNaN(d)) return valor;

  const mes = String(d.getMonth()+1)
    .padStart(2,"0");

  const ano = d.getFullYear();

  return mes + "-" + ano;
}

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

/*====================== FUNCTION STATUS ASSOCIADO ===============*/
function statusAssociado(cpf){
  const pendente = cobrancas.some(c => c[2] == cpf && c[5] == "Pendente");
  return pendente ? "Devedor" : "Regular";
}

/*======================== FUNCTION VALIDAR CPF =========================*/
function validarCPFFront(cpf){

  cpf = String(cpf).replace(/\D/g,"");

  if(cpf.length !== 11) return false;

  if(/^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  let resto;

  for(let i=1; i<=9; i++){
    soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;

  if((resto == 10) || (resto == 11)){
    resto = 0;
  }

  if(resto != parseInt(cpf.substring(9,10))){
    return false;
  }

  soma = 0;

  for(let i = 1; i <= 10; i++){
    soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
  }

  resto = (soma * 10) % 11;

  if((resto == 10) || (resto == 11)){
    resto = 0;
  }

  if(resto != parseInt(cpf.substring(10,11))){
    return false;
  }

  return true;
}

/*===================== FUNCTION VALIDAR CAMPOS =================*/
function validarCampos(){

  let ok = true;

  [m_nome, m_cpf, m_mensal].forEach(c=>{
    c.classList.remove("input-erro");

    if(!c.value){
      c.classList.add("input-erro");
      ok = false;
    }
  });

  if(!validarCPFFront(m_cpf.value)){
    m_cpf.classList.add("input-erro");
    ok = false;
  }

  return ok;
}

/* ==================== JA GEROU ================*/
function jaGerouMesAtual(){

  const hoje = new Date();

  const mesAtual =
    hoje.getFullYear()
    + "-"
    + String(hoje.getMonth()+1).padStart(2,"0");

  return cobrancas.some(c => {

    const mesCobranca = String(c[3])
      .trim()
      .substring(0,7);

    return mesCobranca === mesAtual;

  });
}