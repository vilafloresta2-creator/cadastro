/* ----------------------------------------------
              RESERVA UTILS
---------------------------------------------- */

/* ================= OBTER ================= */
function obterReserva(id){

  return safeArray(state.reservas)

    .map(r => reservaObj(r))

    .find(
      r => String(r.id) === String(id)
    );
}


/* ================= RESERVAS POR DATA ================= */
function obterReservasPorData(data){

  return safeArray(state.reservas)
    .map(reservaObj)
    .filter(r =>

      normalizarDataISO(r.data)
      ===
      data

    );
}


/* ================= VALIDAR ================= */
function obterReservaOuErro(id){

  const reserva =
    obterReserva(id);

  if(!reserva){

    showToast(
      "Reserva não encontrada",
      "error"
    );

    return null;
  }

  return reserva;
}