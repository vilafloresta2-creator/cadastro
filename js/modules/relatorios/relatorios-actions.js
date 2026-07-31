/* ---------------------------------------------- 
              RELATORIOS ACTIONS
 ---------------------------------------------- */

function abrirDetalheRelatorio(
  tipo,
  mes
){

  switch(tipo){

    case "entradas":
      abrirRelatorioCaixa(
        mes,
        "entrada"
      );
      break;

    case "saidas":
      abrirRelatorioCaixa(
        mes,
        "saida"
      );
      break;

    case "inadimplencia":
      abrirRelatorioInadimplentes(
        mes
      );
      break;
  }
}