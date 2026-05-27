/* =========================================
   AGENDA
========================================= */


/* ================= RENDER ================= */
function renderAgenda(){

  const hoje = new Date();

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


/* ================= DATA ISO ================= */
function normalizarDataISO(data){

  if(!data){
    return "";
  }

  return String(data)
    .substring(0,10);
}


/* ================= MONTAR ================= */
function montarAgenda(
  ano,
  mes
){

  const primeiroDia =
    new Date(ano, mes, 1);

  const ultimoDia =
    new Date(ano, mes + 1, 0);

  const totalDias =
    ultimoDia.getDate();

  const inicioSemana =
    primeiroDia.getDay();

  const nomesMeses = [

    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"

  ];

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
          📅 ${nomesMeses[mes]} ${ano}
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

  for(let i = 0; i < inicioSemana; i++){

    html += `
      <div class="agenda-dia vazio"></div>
    `;
  }

  for(let dia = 1; dia <= totalDias; dia++){

    const dataFormatada =

      `${ano}-${String(mes + 1).padStart(2,"0")}-${String(dia).padStart(2,"0")}`;

    const reservasDia =

      safeArray(state.reservas)
        .filter(r => {

          const dataReserva =
            normalizarDataISO(r[4]);

          return (
            dataReserva === dataFormatada
          );

        });

    let pagos = 0;
    let parciais = 0;
    let pendentes = 0;

    reservasDia.forEach(r => {

      const status =
        String(r[9] || "");

      if(status === "Pago"){

        pagos++;

      }else if(status === "Parcial"){

        parciais++;

      }else{

        pendentes++;
      }

    });

    html += `

      <div
        class="agenda-dia"
        onclick="abrirDiaAgenda('${dataFormatada}')"
      >

        <div class="agenda-numero">
          ${dia}
        </div>

        ${
          reservasDia.length
            ? `
              <div style="
                margin-top:8px;
                display:flex;
                flex-direction:column;
                gap:4px;
                font-size:12px;
                font-weight:bold;
              ">

                ${
                  pagos
                    ? `
                      <div style="color:#22c55e;">
                        🟢 ${pagos}
                      </div>
                    `
                    : ""
                }

                ${
                  parciais
                    ? `
                      <div style="color:#f59e0b;">
                        🟡 ${parciais}
                      </div>
                    `
                    : ""
                }

                ${
                  pendentes
                    ? `
                      <div style="color:#ef4444;">
                        🔴 ${pendentes}
                      </div>
                    `
                    : ""
                }

              </div>
            `
            : ""
        }

      </div>

    `;
  }

  html += `

      </div>

    </div>

    <div id="agendaDetalhes"></div>

  `;

  tela.innerHTML = html;

  state.agendaMes = mes;
  state.agendaAno = ano;
}


/* ================= NAVEGAR ================= */
function navegarAgenda(direcao){

  let mes =
    state.agendaMes + direcao;

  let ano =
    state.agendaAno;

  if(mes < 0){

    mes = 11;
    ano--;

  }else if(mes > 11){

    mes = 0;
    ano++;
  }

  montarAgenda(
    ano,
    mes
  );
}


/* ================= ABRIR DIA ================= */
function abrirDiaAgenda(data){

  state.agendaDataSelecionada =
    data;

  const lista =

    safeArray(state.reservas)
      .filter(r => {

        const dataReserva =
          normalizarDataISO(r[4]);

        return (
          dataReserva === String(data)
        );

      });

  const el =
    document.getElementById(
      "agendaDetalhes"
    );

  if(!el){
    return;
  }

  if(!lista.length){

    el.innerHTML = `

      <div class="card">

        <div style="
          font-size:18px;
          font-weight:600;
          margin-bottom:10px;
        ">
          ${formatarDataBR(data)}
        </div>

        <div style="
          margin-bottom:16px;
          opacity:.7;
        ">
          Nenhuma reserva neste dia.
        </div>

        <button
          class="btn"
          onclick="ir('reservas')"
        >
          + Nova Reserva
        </button>

      </div>

    `;

    return;
  }

  let html = `

    <div class="card">

      <div style="
        font-size:20px;
        font-weight:700;
      ">
        📅 ${formatarDataBR(data)}
      </div>

    </div>

  `;

  lista.forEach(r => {

    const status =
      String(r[9] || "");

    html += `

      <div
        class="card"
        onclick="abrirReserva('${r[0]}')"
        style="
          cursor:pointer;
          transition:.2s;
          margin-top:10px;
        "
      >

        <div style="
          display:flex;
          justify-content:space-between;
          gap:10px;
          flex-wrap:wrap;
        ">

          <div>

            <div style="
              font-size:18px;
              font-weight:600;
            ">
              ${r[1]}
            </div>

            <div style="
              margin-top:6px;
            ">
              📍 ${r[3]}
            </div>

            <div>
              🕒 ${formatarHoraBR(r[5])}
            </div>

            <div>
              💰 ${moeda(r[6])}
            </div>

          </div>

          <div style="
            text-align:right;
          ">

            <div style="
              margin-top:8px;
              font-weight:600;
              color:
                ${
                  status === "Pago"
                    ? "#22c55e"
                    : status === "Parcial"
                      ? "#f59e0b"
                      : "#ef4444"
                };
            ">
              ${status}
            </div>

          </div>

        </div>

      </div>

    `;
  });

  el.innerHTML = html;
}


/* ================= ABRIR RESERVA ================= */
function abrirReserva(id){

  ir("reservas");

  setTimeout(() => {

    const card =
      document.getElementById(
        "reserva_" + id
      );

    if(card){

      card.scrollIntoView({
        behavior:"smooth",
        block:"center"
      });

      card.style.transition =
        "0.3s";

      card.style.boxShadow =
        "0 0 0 3px #3b82f6";

      setTimeout(() => {

        card.style.boxShadow = "";

      }, 2000);
    }

  }, 300);
}