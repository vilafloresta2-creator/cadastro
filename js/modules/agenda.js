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

      const hoje = new Date();

      const dataHoje =
      `${hoje.getFullYear()}-${String(hoje.getMonth()+1).padStart(2,"0")}-${String(hoje.getDate()).padStart(2,"0")}`;

      const classeHoje =
        dataFormatada === dataHoje
          ? "hoje"
          : "";

    const reservasDia =

      safeArray(state.reservas)
        .filter(r => {

          const reserva =
            reservaObj(r);

          const dataReserva =
            normalizarDataISO(reserva.data);

          return (
            dataReserva === dataFormatada
          );

        });    

    const reservasOrdenadas =
      reservasDia
        .map(r => reservaObj(r))
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

              ${reservasPreview.length ? `                 

                  ${reservasPreview.map(r => {

                    const tooltip = `
                      ${r.nome}
                      ⏰ ${formatarHora(r.hora)}
                      📍 ${r.espaco}
                      💰 ${moeda(r.valor)}
                      💳 Pago: ${moeda(r.pago || 0)}
                      📌 Saldo: ${moeda(r.saldo || 0)}
                      Status: ${r.status}
                      `.trim();

                    let classePreview = "preview-pendente";

                    if(r.status === "Pago"){

                      classePreview = "preview-pago";

                    }else if(r.status === "Parcial"){

                      classePreview = "preview-parcial";
                    }

                    return `

                    <div class="agenda-preview-item ${classePreview}"
                       data-tooltip="${tooltip}">

                      <div class="agenda-preview-hora">
                        ${formatarHora(r.hora)}
                      </div>

                      <div class="agenda-preview-nome">
                        ${r.nome}
                      </div>

                    </div>

                  `;

                  }).join("")}

                  ${
                    reservasDia.length > 3
                      ? `
                        <div class="agenda-preview-extra">
                          +${reservasDia.length - 3} reserva(s)
                        </div>
                      `
                      : ""


                  }                  
                
              ` : ""}

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




/* ================= ABRIR RESERVA ================= */
function clicarDiaAgenda(data){

  const reservas =

    safeArray(state.reservas)
      .filter(r => {

        const reserva =
          reservaObj(r);

        return (

          normalizarDataISO(
            reserva.data
          ) === data

        );

      });

  if(reservas.length){

    abrirListaReservasDia(data);

    return;
  }

  abrirFormularioReserva({

    data

  });
} 

/* ================= ABRIR LISTA RESERVA ================= */
function abrirListaReservasDia(data){

  const reservas =

    safeArray(state.reservas)
      .filter(r => {

        const reserva =
          reservaObj(r);

        return (
          normalizarDataISO(
            reserva.data
          ) === data

        );

      });

  let html = `


    <div
      class="modal-box"
      onclick="event.stopPropagation()"      
    >

      <h3>
        📅 ${formatarData(data)}
      </h3>

  `;

  reservas.forEach(r => {

    const reserva =
      reservaObj(r);     

    html += `

      <div
        class="card agenda-card-reserva" 
        style="
          cursor:pointer;
          margin-top:10px;"

        onclick="
          closeModal('modal');
          abrirFormularioReserva(
            ${JSON.stringify(reserva)
              .replace(/"/g,'&quot;')}
          );
        "
      >

        <b>
          ${formatarHora(reserva.hora)}
        </b>

        <br>

        ${reserva.nome}

      </div>

    `;

  });

  html += `

      <button
        class="btn"
        style="
          width:100%;
          margin-top:15px;
        "
        onclick="
          closeModal('modal');
          abrirFormularioReserva({
            data:'${data}'
          });
        "
      >
        ➕ Nova Reserva
      </button>

    </div>

  `;

  modal.innerHTML = html;

  modal.style.display = "flex";

  modal.classList.add("show");
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

/* ================= ABRIR RESERVA AGENDA ================= 
function abrirReservaAgenda(id){

  const reserva =

    safeArray(state.reservas)
      .map(r => reservaObj(r))
      .find(r => String(r.id) === String(id));

  if(!reserva){
    return;
  }

  abrirFormularioReserva(reserva);
}*/