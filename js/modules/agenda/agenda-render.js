/* ----------------------------------------------
                AGENDA RENDER
---------------------------------------------- */

/* ================= RENDER ================= */
function renderAgenda(){

  const hoje =
    new Date();

  const ano =

    state.agendaAno
    ??

    hoje.getFullYear();

  const mes =

    state.agendaMes
    ??

    hoje.getMonth();

  montarAgenda(
    ano,
    mes
  );

}


/* ================= MONTAR AGENDA ================= */
function montarAgenda(
  ano,
  mes
){

  const primeiroDia =
    new Date(
      ano,
      mes,
      1
    );

  const ultimoDia =
    new Date(
      ano,
      mes + 1,
      0
    );

  const totalDias =
    ultimoDia.getDate();

  const inicioSemana =
    primeiroDia.getDay();

  let html = `

    <div class="card">

      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:20px;
      ">

        <button
          class="btn"
          onclick="navegarAgenda(-1)"
        >
          ◀
        </button>

        <h2>
          📅 ${NOMES_MESES[mes]} ${ano}
        </h2>

        <button
          class="btn"
          onclick="navegarAgenda(1)"
        >
          ▶
        </button>

      </div>

      <div class="agenda-grid agenda-header">

        <div>Dom</div>
        <div>Seg</div>
        <div>Ter</div>
        <div>Qua</div>
        <div>Qui</div>
        <div>Sex</div>
        <div>Sáb</div>

      </div>

      <div class="agenda-grid">

  `;

  const hoje =
    hojeISO();

  for(
    let i = 0;
    i < inicioSemana;
    i++
  ){

    html += `
      <div class="agenda-dia vazio"></div>
    `;

  }

  for(
    let dia = 1;
    dia <= totalDias;
    dia++
  ){

    const dataFormatada =

      `${ano}-${String(mes + 1).padStart(2,"0")}-${String(dia).padStart(2,"0")}`;

    const classeHoje =

      dataFormatada === hoje

        ? "hoje"

        : "";

    const reservasDia =

      obterReservasPorData(
        dataFormatada
      );

    const reservasOrdenadas =

      reservasDia

        .slice()

        .sort((a,b)=>

          String(a.hora || "")

            .localeCompare(

              String(b.hora || "")

            )

        );

    const reservasPreview =

      reservasOrdenadas

        .slice(0,3);

    html += `

      <div
        class="agenda-dia ${classeHoje}"
        onclick="clicarDiaAgenda('${dataFormatada}')"
      >

        <div class="agenda-numero">

          ${dia}

        </div>

        ${

          reservasPreview.length

            ?

            `

              ${

                reservasPreview

                  .map(renderAgendaPreview)

                  .join("")

              }

              ${

                reservasDia.length > 3

                  ?

                  `
                    <div class="agenda-preview-extra">

                      +${reservasDia.length - 3} reserva(s)

                    </div>
                  `

                  :

                  ""

              }

            `

            :

            ""

        }

      </div>

    `;

  }

  html += `

      </div>

    </div>

    <div id="agendaDetalhes"></div>

  `;

  state.agendaMes =
    mes;

  state.agendaAno =
    ano;

  setHTML(
    "tela",
    html
  );

}


/* ================= PREVIEW ================= */
function renderAgendaPreview(
  reserva
){

  const tooltip = `

${reserva.nome}
⏰ ${formatarHora(reserva.hora)}
📍 ${reserva.espaco}
💰 ${moeda(reserva.valor)}
💳 Pago: ${moeda(reserva.pago || 0)}
📌 Saldo: ${moeda(reserva.saldo || 0)}
Status: ${reserva.status}

  `.trim();

  return `

    <div
      class="agenda-preview-item ${classePreviewReserva(reserva.status)}"
      data-tooltip="${tooltip}"
    >

      <div class="agenda-preview-hora">

        ${formatarHora(
          reserva.hora
        )}

      </div>

      <div class="agenda-preview-nome">

        ${reserva.nome}

      </div>

    </div>

  `;

}


/* ================= STATUS ================= */
function classePreviewReserva(
  status
){

  if(status === "Pago"){
    return "preview-pago";
  }

  if(status === "Parcial"){
    return "preview-parcial";
  }

  return "preview-pendente";

}