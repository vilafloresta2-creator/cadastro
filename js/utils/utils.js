/* =========================================
   UTILS
========================================= */

/* ========== ENTRADA ========== */
function isEntrada(tipo){

  return (

    normalizarTexto(tipo)
      .toLowerCase()

    ===

    "entrada"

  );
}


/* ========== SAIDA ========== */
function isSaida(tipo){

  return (

    normalizarTexto(tipo)
      .toLowerCase()

    ===

    "saida"

  );
}


/* ========== TIPO CAIXA ========== */
function tipoCaixa(tipo){

  if(isEntrada(tipo)){
    return "Entrada";
  }

  if(isSaida(tipo)){
    return "Saida";
  }

  return "";
}