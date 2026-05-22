/* =========================================
   AGENDA
========================================= */


/* ================= RENDER ================= */
function renderAgenda(){

  const hoje = new Date();

  const ano =
    hoje.getFullYear();

  const mes =
    hoje.getMonth();

  montarAgenda(
    ano,
    mes
  );
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

  for(let i=0;i<inicioSemana;i++){

    html += `
      <div class="agenda-dia vazio"></div>
    `;
  }

  for(let dia=1; dia<=totalDias; dia++){

    const dataFormatada =

      `${ano}-${String(mes+1).padStart(2,"0")}-${String(dia).padStart(2,"0")}`;

    const reservasDia =

      safeArray(state.reservas)
        .filter(r => {

          const dataReserva =
            String(r[4] || "")
              .substring(0,10);

          return (
            dataReserva === dataFormatada
          );

        });

    let cor = "";

    if(reservasDia.length){

      const status =

        String(
          reservasDia[0][9] || ""
        );

      if(status === "Pago"){

        cor = "#22c55e";

      }else if(status === "Parcial"){

        cor = "#f59e0b";

      }else{

        cor = "#ef4444";
      }
    }

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
              <div
                style="
                  margin-top:8px;
                  font-size:12px;
                  color:${cor};
                  font-weight:bold;
                "
              >
                ${reservasDia.length} reserva(s)
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

  const lista =

    safeArray(state.reservas)
      .filter(r => {

      const dataReserva =
        String(r[4] || "")
          .substring(0,10);

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
        Nenhuma reserva neste dia.
      </div>

    `;

    return;
  }

  let html = "";

  lista.forEach(r => {

    html += `

      <div class="card">

        <div style="
          font-size:18px;
          font-weight:600;
        ">
          ${r[1]}
        </div>

        <div style="margin-top:6px;">
          📍 ${r[3]}
        </div>

        <div>
          🕒 ${r[5]}
        </div>

        <div>
          💰 ${moeda(r[6])}
        </div>

        <div>
          Status:
          <b>${r[9]}</b>
        </div>

      </div>

    `;
  });

  el.innerHTML = html;
}