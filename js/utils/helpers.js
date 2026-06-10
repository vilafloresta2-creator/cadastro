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

/* =====================================
                OBJETOS 
===================================== */

/* ========== COBRANCA OBJ ========== */
function cobrancaObj(c){

  return {

    id: c[0] || "",

    nome: c[1] || "",

    cpf: limparCPF(c[2] || ""),

    mes: c[3] || "",

    valor: numero(c[4]),

    status: c[5] || "Pendente",

    dataPagamento: c[6] || "",

    recibo: c[7] || ""

  };
}

/* ========== CAIXA OBJ ========== */
function caixaObj(c){

  return {

    id: c[0] || "",

    data: c[1] || "",

    tipo: c[2] || "",

    categoria: c[3] || "",

    descricao: c[4] || "",

    valor: numero(c[5])

  };
}

/* ========== RECIBO OBJ ========== */
function reciboObj(r){

  return {

    id: r[0] || "",

    numero: r[1] || "",

    nome: r[2] || "",

    cpf: r[3] || "",

    mes: r[4] || "",

    valor: numero(r[5]),

    data: r[6] || ""

  };

}

/* ========= RESERVA OBJ ========= */
function reservaObj(r){

  if(!Array.isArray(r)){
    return r || {};
  }

  return {

    id: r[0] || "",
    associadoId: r[1] || "",
    nome: r[2] || "",
    telefone: r[3] || "",
    espaco: r[4] || "",
    data: r[5] || "",
    hora: r[6] || "",
    valor: numero(r[7]),
    pago: numero(r[8]),
    saldo: numero(r[9]),
    status: r[10] || "",
    observacao: r[11] || ""

  };

}