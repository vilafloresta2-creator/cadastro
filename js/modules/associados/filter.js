/* =========================================
   ASSOCIADOS FILTER
========================================= */


/* ========== TERMO BUSCA ========== */
function obterBuscaAssociado(){

  return normalizarTexto(

    getValue("busca")

  );
}


/* ========== ASSOCIADOS FILTRADOS ========== */
function obterAssociadosFiltrados(){

  const termoBusca =
    obterBuscaAssociado();

  return safeArray(state.associados)

  .slice(1)

    .filter(a => {

      if(!a || !a.length){
        return false;
      }

      const nome =
        normalizarTexto(a[1]);

      return nome.includes(
        termoBusca
      );
    });
}