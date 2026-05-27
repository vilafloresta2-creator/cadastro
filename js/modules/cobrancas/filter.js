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

  return lista.filter(c =>

    formatarMes(c[3])
      === mes
  );
}