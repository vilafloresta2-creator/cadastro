/* ---------------------------------------------- 
                  AGENDA MODAL
 ---------------------------------------------- */

/* ================= ABRIR LISTA RESERVA ================= 
function abrirAgendaModal(data){

  const reservas =
    obterReservasPorData(data);

  let html = `


    <div
      class="modal-box"
      onclick="event.stopPropagation()"      
    >

      <h3>
        📅 ${formatarData(data)}
      </h3>

  `;

  reservas.forEach(reserva => {     

    html += `

      <div
        class="card agenda-card-reserva" 
        style="
          cursor:pointer;
          margin-top:10px;"

        onclick="
          closeModal('modal');
          abrirReservaForm(
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
          abrirReservaForm({
            data:'${data}'
          });
        "
      >
        ➕ Nova Reserva
      </button>

    </div>

  `;

  abrirModalPrincipal(html);
}*/




function abrirAgendaModal(data){

  abrirModalPrincipal(
    renderAgendaModal(data)
  );

}

function renderAgendaModal(data){

  const reservas =
    obterReservasPorData(data);

  let html = `


    <div
      class="modal-box"
      onclick="event.stopPropagation()"      
    >

      <h3>
        📅 ${formatarData(data)}
      </h3>

  `;

  reservas.forEach(reserva => {     

    html += `

      <div
        class="card agenda-card-reserva" 
        style="
          cursor:pointer;
          margin-top:10px;"

        onclick="
          closeModal('modal');
          abrirReservaForm(
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
          abrirReservaForm({
            data:'${data}'
          });
        "
      >
        ➕ Nova Reserva
      </button>

    </div>

  `;

  return html;

}