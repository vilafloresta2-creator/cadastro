/* ----------------------------------------------
              RESERVA RENDER
---------------------------------------------- */

/* ============== RENDER RESERVAS ============== */
function renderReservas(){

  setHTML(
    "tela",
    `
      <div id="listaReservas"></div>
    `
  );

  listarReservas();
}


/* ============== LISTAR RESERVAS ============== */
function listarReservas(){

  const listaEl =
    getEl("listaReservas");

  if(!listaEl){
    return;
  }

  const lista =

    safeArray(state.reservas)

      .map(reservaObj);

  if(!lista.length){

    setHTML(

      "listaReservas",

      renderListaVazia(
        "Nenhuma reserva encontrada."
      )

    );

    return;
  }

  setHTML(

    "listaReservas",

    lista

      .slice()

      .reverse()

      .map(renderReservaCard)

      .join("")

  );

}


/* ============== RENDER RESERVA CARD ============== */
function renderReservaCard(reserva){

  return renderCardPadrao({

    classe:
      `reserva-card ${classeBarraStatus(reserva.status)}`,

    titulo:
      reserva.nome,

    subtitulo:
      reserva.telefone || "",

    detalhe: [
      `📍 ${reserva.espaco}`,
      `📅 ${formatarData(reserva.data)} às ${formatarHora(reserva.hora)}`
    ].join("<br>"),

    info: `

      ${renderInfoValor(
        "Total",
        moeda(reserva.valor)
      )}

      ${renderInfoValor(
        "Pago",
        moeda(reserva.pago)
      )}

      ${renderInfoValor(
        "Saldo",
        moeda(reserva.saldo),
        reserva.saldo > 0
          ? "text-danger"
          : "text-success"
      )}

    `,


      botao:renderActions(`

        ${renderButton({
          texto:"💰",
          classe:"btn-icon",
          onclick:`receberReserva('${reserva.id}')`
        })}

        ${renderButton({
          texto:"📄",
          classe:"btn-icon",
          onclick:`gerarContratoReserva('${reserva.id}')`
        })}

        ${renderButton({
          texto:"📲",
          classe:"btn-icon",
          onclick:`enviarWhatsReserva('${reserva.id}')`
        })}

        ${renderButton({
          texto:"🗑️",
          classe:"btn-cancelar btn-icon",
          onclick:`excluirReserva('${reserva.id}')`
        })}

      `)

  });

}


/* ================= CONTRATO ================= */
function renderContratoReserva(reserva){

  return `

    <html>

      <head>

        <title>
          Contrato Reserva
        </title>

        <style>

          body{
            font-family:Arial;
            padding:40px;
            line-height:1.6;
            color:#111;
          }

          h1{
            text-align:center;
          }

          .bloco{
            margin-top:20px;
          }

          .assinatura{
            margin-top:80px;
          }

        </style>

      </head>

      <body>

        <h1>
          CONTRATO DE RESERVA
        </h1>

        <div class="bloco">

          <b>Nome:</b>
          ${reserva.nome}

          <br>

          <b>Telefone:</b>
          ${reserva.telefone || ""}

          <br><br>

          <b>Espaço:</b>
          ${reserva.espaco}

          <br>

          <b>Data:</b>
          ${formatarData(reserva.data)}

          <br>

          <b>Hora:</b>
          ${reserva.hora}

          <br><br>

          <b>Valor Total:</b>
          ${moeda(reserva.valor)}

          <br>

          <b>Valor Pago:</b>
          ${moeda(reserva.pago)}

          <br>

          <b>Saldo:</b>
          ${moeda(reserva.saldo)}

          <br>

          <b>Status:</b>
          ${reserva.status}

        </div>

        <div class="bloco">

          Declaro estar ciente das regras
          de utilização do espaço comunitário,
          responsabilizando-me por eventuais
          danos causados durante o evento.

        </div>

        <div class="assinatura">

          ___________________________________

          <br>

          Assinatura do Responsável

        </div>

      </body>

    </html>

  `;

}