/* =========================================
   HELPERS
========================================= */


/* ========== TEXTO ========== */
function normalizarTexto(valor){

  return String(valor || "")

    .trim()

    .normalize("NFD")

    .replace(/[\u0300-\u036f]/g, "")

    .toLowerCase();
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


/* ========== OBTER MES DATA ========== */
function obterMesData(data){

  return obterMes(data);
}


/* ========== ENTRADA ========== */
function isEntrada(tipo){

  return (

    normalizarTexto(tipo)

    ===

    "entrada"

  );
}


/* ========== SAIDA ========== */
function isSaida(tipo){

  return (

    normalizarTexto(tipo)

    ===

    "saida"

  );
}


/* ========== TIPO CAIXA ========== */
function tipoCaixa(tipo){

  return isEntrada(tipo)
    ? "Entrada"
    : "Saida";
}


/* ========== STATUS ASSOCIADO ========== */
function statusAssociado(cpf){

  const pendente =

    safeArray(state.cobrancas)

      .some(c =>

        String(c[2] || "")
          .trim()

        ===

        String(cpf || "")
          .trim()

        &&

        normalizarTexto(c[5])

        ===

        "pendente"

      );

  return pendente
    ? "Devedor"
    : "Regular";
}


/* ========== JA GEROU MES ========== */
function jaGerouMesAtual(){

  const hoje =
    new Date();

  const mesAtual =

    String(hoje.getMonth() + 1)
      .padStart(2,"0")

    +

    "-"

    +

    hoje.getFullYear();

  return safeArray(state.cobrancas)

    .some(c => {

      const mes =

        String(c[3] || "")
          .trim()
          .substring(0,7);

      return mes === mesAtual;

    });
}