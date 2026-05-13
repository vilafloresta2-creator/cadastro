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