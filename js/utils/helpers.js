/* =========================================
   HELPERS
========================================= */


/* ========== TEXTO ========== */
function normalizarTexto(valor){

  return String(valor || "")

    .trim()

    .normalize("NFD")

    .replace(/[\u0300-\u036f]/g, "");
}


/* ========== ARRAY ========== */
function safeArray(valor){

  return Array.isArray(valor)
    ? valor
    : [];
}


/* ========== NUMERO ========== */
function numero(valor){

  if(
    valor === null
    ||
    valor === undefined
    ||
    valor === ""
  ){
    return 0;
  }

  return Number(valor) || 0;
}


/* ========== DATA VALIDA ========== */
function dataValida(valor){

  if(!valor){
    return false;
  }

  const data =
    new Date(valor);

  return !isNaN(data.getTime());
}


/* ========== OBTER MES ========== */
function obterMes(data){

  if(!data){
    return "";
  }

  const d =
    new Date(data);

  if(isNaN(d.getTime())){
    return "";
  }

  return (

    String(d.getMonth() + 1)
      .padStart(2,"0")

    +

    "-"

    +

    d.getFullYear()

  );
}


/* ========== VALOR POSITIVO ========== */
function valorPositivo(valor){

  return numero(valor) > 0;
}


/* ========== PARSE DATA ISO ========== */
function parseDataISO(data){

  if(!data){
    return null;
  }

  const partes =
    String(data)
      .split("-");

  if(partes.length !== 3){
    return null;
  }

  const ano =
    Number(partes[0]);

  const mes =
    Number(partes[1]);

  const dia =
    Number(partes[2]);

  return new Date(
    ano,
    mes - 1,
    dia
  );
}

/* ========== GET VALUE ========== */
function getValue(id){

  return document
    .getElementById(id)
    ?.value || "";
}


/* ========== SET VALUE ========== */
function setValue(id, valor){

  const el =
    document.getElementById(id);

  if(!el){
    return;
  }

  el.value =
    valor ?? "";
}