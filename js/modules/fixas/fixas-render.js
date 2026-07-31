/* ---------------------------------------------- 
              FIXAS RENDER
 ---------------------------------------------- */

/* ========== RENDER DESPESAS FIXAS ========== */
function renderFixas(){

  setHTML(
    "tela",
    `
      <div id="listaFixas"></div>
    `
  );

  listarFixas();

}


/* ========== LISTAR DESPESAS FIXAS ========== */
function listarFixas(){

  const listaEl =
    getEl("listaFixas");

  if(!listaEl){
    return;
  }

  const lista =

    safeArray(state.fixas)

      .map(fixaObj)

      .sort((a,b)=>

        numero(a.dia)

        -

        numero(b.dia)

      );

  if(!lista.length){

    setHTML(

      "listaFixas",

      renderListaVazia(
        "Nenhum lançamento encontrado."
      )

    );

    return;
  }

  setHTML(

    "listaFixas",

    lista

      .map(renderFixaCard)

      .join("")

  );

}


/* ========== RENDER CARD ========== */
function renderFixaCard(fixa){

  return renderCardPadrao({

    classe: "fixa-card",

    titulo:
      fixa.categoria || "-",

    subtitulo:
      fixa.descricao || "-",

    detalhe:
      `📅 Dia ${fixa.dia}`,
    
    
    info: renderInfoValor(

          "Valor",

          moeda(fixa.valor),

          "text-danger"

      ),  

    onclick:
      `editarFixa('${fixa.id}')`,

    botao:

      renderButton({

        texto:"🗑️",

        classe:
          "btn-cancelar btn-icon",

        onclick:
          `
          event.stopPropagation();
          excluirFixa('${fixa.id}');
          `
      })

  });

}