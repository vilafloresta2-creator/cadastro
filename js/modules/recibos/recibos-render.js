/* ----------------------------------------------
              RECIBOS RENDER
---------------------------------------------- */

/* ============= RENDER RECIBOS ============= */
function renderRecibos(){

  setHTML(

    "tela",

    `
      <div class="card">
        <h3>Recibos Emitidos</h3>
      </div>

      <div id="listaRecibos"></div>
    `

  );

  listarRecibos();

}


/* ============= LISTAR RECIBOS ============= */
function listarRecibos(){

  const lista =

    safeArray(state.recibos)

      .map(reciboObj)

      .reverse();

  if(!lista.length){

    setHTML(

      "listaRecibos",

      renderListaVazia(
        "Nenhum recibo encontrado."
      )

    );

    return;

  }

  setHTML(

    "listaRecibos",

    lista

      .map(renderReciboCard)

      .join("")

  );

}


/* ========= RENDER RECIBO CARD ========= */
function renderReciboCard(recibo){

  return renderCardPadrao({

    classe:
      "recibo-card",

    titulo:
      recibo.nome || "-",

    subtitulo:
      recibo.numero || "-",

    detalhe:
      `${formatarMes(recibo.mes)} • ${formatarData(recibo.data)}`,

    info:

      renderInfoValor(

        "Valor",

        moeda(recibo.valor),

        "text-success"

      ),

    botao:

      renderButton({

        texto:"🧾",

        classe:
          "btn-recibo btn-icon",

        onclick:`
          event.stopPropagation();
          reimprimir('${recibo.numero}');
        `

      })

  });

}