/* ---------------------------------------------- 
             ASSOCIADOS FILTER
 ---------------------------------------------- */

/* ========== TERMO BUSCA ========== */
function obterBuscaAssociado(){

  return normalizarTexto(

    getValue("busca")

  );
}


/* ========== FILTRAR ASSOCIADOS ========== */
function obterAssociadosFiltrados(){

  const busca =
    obterBuscaAssociado()
      .toLowerCase();

  return safeArray(state.associados)

    .filter(Boolean)

    .filter(associado => {

      return (

        normalizarTexto(
          associado.nome || ""
        )
          .toLowerCase()
          .includes(busca)

        ||

        String(
          associado.cpf || ""
        )
          .includes(busca)

        ||

        String(
          associado.telefone || ""
        )
          .includes(busca)

      );

    });

}