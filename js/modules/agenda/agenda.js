/* ---------------------------------------------- 
                  AGENDA
 ---------------------------------------------- */

/* ================= ABRIR RESERVA ================= */
function clicarDiaAgenda(data){

  const reservas =
    obterReservasPorData(data);

  if(reservas.length){

    abrirAgendaModal(data);

    return;
  }

  abrirReservaForm({

    data

  });
}