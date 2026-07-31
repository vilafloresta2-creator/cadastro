/* ---------------------------------------------- 
                  AGENDA UTILS
 ---------------------------------------------- */

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

/* ================= DATA ISO ================= */
function normalizarDataISO(data){

  if(!data){
    return "";
  }

  return String(data)
    .substring(0,10);
}