/* ----------------------------------------------
                FORMAT
---------------------------------------------- */

/* ========== MOEDA ========== */
function moeda(valor){

  return numero(valor)

    .toLocaleString(

      "pt-BR",

      {
        style:"currency",
        currency:"BRL"
      }

    );
}


/* ========== DATA ========== */
function formatarData(dataISO){

  if(!dataISO){
    return "-";
  }

  const data =
    parseDataISO(dataISO)
    ||
    new Date(dataISO);

  if(
    isNaN(data.getTime())
  ){
    return "-";
  }

  return data
    .toLocaleDateString(
      "pt-BR",
      {
        timeZone:
          "America/Sao_Paulo"
      }
    );
}


/* ========== HORA ========== */
function formatarHora(hora){

  if(!hora){
    return "";
  }

  return String(hora)
    .substring(0,5);
}


/* ========== DATA/HORA ========== */
function formatarDataHora(data){

  if(!data){
    return "-";
  }

  const d =
    parseDataISO(data)
    ||
    new Date(data);

  if(
    isNaN(d.getTime())
  ){
    return "-";
  }

  return (

    d.toLocaleDateString(
      "pt-BR",
      {
        timeZone:
          "America/Sao_Paulo"
      }
    )

    +

    " "

    +

    d.toLocaleTimeString(
      "pt-BR",
      {
        hour:"2-digit",
        minute:"2-digit",
        timeZone:
          "America/Sao_Paulo"
      }
    )

  );
}


/* ========== MES ========== */
function formatarMes(valor){

  if(!valor){
    return "";
  }

  const texto =

    String(valor)
      .trim();


  /* =========================================
                YYYY-MM
  ========================================= */

  if(
    /^\d{4}-\d{2}$/
      .test(texto)
  ){

    const [
      ano,
      mes
    ] = texto.split("-");

    return `${mes}-${ano}`;
  }


  /* =========================================
              MM-YYYY
  ========================================= */

  if(
    /^\d{2}-\d{4}$/
      .test(texto)
  ){

    return texto;
  }


  /* =========================================
                DATE
  ========================================= */

  const data =
    new Date(texto);

  if(
    isNaN(data.getTime())
  ){
    return texto;
  }

  return (

    String(
      data.getMonth() + 1
    )

      .padStart(2,"0")

    +

    "-"

    +

    data.getFullYear()

  );
}