/* ----------------------------------------------
              RESERVA ACTIONS
---------------------------------------------- */


/* ================= WHATSAPP ================= */
function enviarWhatsReserva(id){

  const reserva =
    obterReserva(id);

  if(!reserva){

    showToast(
      "Reserva não encontrada",
      "error"
    );

    return;
  }

  const telefone =

    String(
      reserva.telefone || ""
    )
      .replace(/\D/g,"");

  if(!telefone){

    showToast(
      "Telefone não informado",
      "warning"
    );

    return;
  }

  const mensagem = `

Olá ${reserva.nome}!

Sua reserva foi registrada com sucesso.

📍 Espaço: ${reserva.espaco}
📅 Data: ${formatarData(reserva.data)}
🕒 Hora: ${reserva.hora}

💰 Valor: ${moeda(reserva.valor)}
✅ Pago: ${moeda(reserva.pago)}
📌 Saldo: ${moeda(reserva.saldo)}

Status: ${reserva.status}

Obrigado!

  `.trim();

  const url =
    `https://wa.me/55${telefone}?text=${encodeURIComponent(mensagem)}`;

  window.open(
    url,
    "_blank"
  );

}


/* ================= CONTRATO ================= */
function gerarContratoReserva(id){

  const reserva =
    obterReservaOuErro(id);

  if(!reserva){
    return;
  }

  const html =
    renderContratoReserva(
      reserva
    );

  const janela =
    window.open(
      "",
      "_blank"
    );

  if(!janela){

    showToast(
      "Não foi possível abrir o contrato. Verifique o bloqueador de pop-ups.",
      "warning"
    );

    return;
  }

  janela.document.write(
    html
  );

  janela.document.close();

  janela.focus();

  janela.print();

}


/* ============== EXCLUIR RESERVA ============== */
async function excluirReserva(id){

  const confirmar =
    await showConfirm(
      "Excluir reserva?"
    );

  if(!confirmar){
    return;
  }

  const ok =
    await excluirReservaAPI(id);

  if(!ok){
    return;
  }

  await carregar();

  limparModalPrincipal();

  renderAgenda();

}