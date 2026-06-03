/* =========================================
   COBRANCAS FILTER
========================================= */


/* ========== FILTRAR ========== */
function filtrarCobrancasPorMes(
  lista,
  mes
){

  if(!mes){
    return lista;
  }

  return lista.filter(c => {

    const cobranca =
      cobrancaObj(c);

    return (

      String(cobranca.mes)
        .substring(0,7)

      ===

      mes

    );

  });

}