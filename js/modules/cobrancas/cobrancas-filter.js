/* ----------------------------------------------
              COBRANÇAS FILTER
---------------------------------------------- */

/* ========== FILTRAR POR MÊS ========== */
function filtrarCobrancasPorMes(
  lista = [],
  mes = ""
){

  if(!mes){
    return safeArray(lista);
  }

  return safeArray(lista)

    .filter(item => {

      const cobranca =
        cobrancaObj(item);

      return (

        String(cobranca.mes || "")
          .substring(0, 7)

        ===

        mes

      );

    });

}


/* ========== PENDENTES ========== */
function obterCobrancasPendentes(){

  return safeArray(state.cobrancas)

    .filter(item => {

      const cobranca =
        cobrancaObj(item);

      return (

        String(cobranca.status || "")

          .trim()

          .toLowerCase()

        ===

        "pendente"

      );

    });

}