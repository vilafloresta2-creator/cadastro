/* =========================================
   FORMAT
========================================= */


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
    new Date(dataISO);

  if(
    isNaN(data.getTime())
  ){
    return "-";
  }

  return data
    .toLocaleDateString(
      "pt-BR"
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