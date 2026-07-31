/* ---------------------------------------------- 
                STATUS
---------------------------------------------- */


/* ========== STATUS INFO ========== */
function obterStatusInfo(status){

  const s =

    normalizarTexto(status)
      .toLowerCase();


  switch(s){

    case "pago":
    case "ativo":

      return {

        cor:
          "status-success",

        classe:
          "status-success"

      };


    case "parcial":

      return {

        cor:
          "warning",

        classe:
          "status-warning"

      };


    default:

      return {

        cor:
          "danger",

        classe:
          "status-danger"

      };

  }

}


/* ========== TIPO CAIXA ========== */
function tipoCaixa(tipo){

  const t =

    normalizarTexto(tipo)
      .toLowerCase();


  switch(t){

    case "entrada":

      return "Entrada";


    case "saida":

      return "Saida";


    default:

      return "";

  }

}


/* ========== STATUS BAR ========== */
function classeBarraStatus(status){

  const s =

    normalizarTexto(status)
      .toLowerCase();


  switch(s){

    case "ativo":
    case "pago":

      return "barra-pago";


    case "parcial":

      return "barra-parcial";


    default:

      return "barra-pendente";

  }

}


/* ========== COR TIPO CAIXA ========== */
function corTipoCaixa(tipo){

  switch(
    tipoCaixa(tipo)
  ){

    case "Entrada":

      return "texto-verde";


    case "Saida":

      return "texto-vermelho";


    default:

      return "texto-azul";

  }

}