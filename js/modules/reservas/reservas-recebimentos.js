/* ---------------------------------------------- 
              RESERVA RECEBIMENTOS
 ---------------------------------------------- */

/* ================= ABRIR MODAL ================= */
function abrirModalRecebimentoReserva(reserva){

  const html = `

    <div
      class="modal-box"
      onclick="event.stopPropagation()"
    >

      <h3>
        💰 Receber Pagamento
      </h3>

      <p>
        <b>${reserva.nome}</b>
      </p>

      <hr style="
        margin:12px 0;
        opacity:.2;
      ">

      <p>
        Valor total:
        <b>${moeda(reserva.valor)}</b>
      </p>

      <p>
        Já pago:
        <b>${moeda(reserva.pago)}</b>
      </p>

      <p>
        Saldo:
        <b>${moeda(reserva.saldo)}</b>
      </p>

      <input
        id="valorRecebimento"
        type="number"
        step="0.01"
        value="${reserva.saldo}"
      >

      <div class="acoes">

        <button
          class="btn"
          onclick="
            confirmarRecebimentoReserva(
              '${reserva.id}'
            )
          "
        >
          Confirmar
        </button>

        <button
          class="btn-cancelar"
          onclick="limparModalPrincipal()"
        >
          Cancelar
        </button>

      </div>

    </div>

  `;

  abrirModalPrincipal(html);
}


/* ================= CONFIRMAR RECEBIMENTO ================= */
async function confirmarRecebimentoReserva(id){

  const valor =
    numero(
      getEl("valorRecebimento")?.value
    );

  if(
    isNaN(valor)
    ||
    valor <= 0
  ){

    showToast(
      "Valor inválido",
      "warning"
    );

    return;
  }  

  await abrirPagamentoReserva(
    id,
    valor
  );
}


/* ================= RECEBER ================= */
async function receberReserva(id){

  const reserva =
    obterReservaOuErro(id);

  if(!reserva){
    return;
  }

  abrirModalRecebimentoReserva(
    reserva
  );
}


/* ================= PAGAMENTO ================= */
async function abrirPagamentoReserva(
  id,
  valorRecebido = null
){

  const valor =
    valorRecebido !== null

      ? valorRecebido

      : window.prompt(
          "Valor recebido"
        );

  if(!valor){
    return;
  }

  const valorPagamento =
    numero(valor);

  const reserva =
    obterReservaOuErro(id);

  if(!reserva){
    return;
  }

  const saldoAtual =
    numero(reserva.saldo); 
      
    if(
    isNaN(valorPagamento)
    ||
    valorPagamento <= 0
  ){
    showToast(
      "Valor inválido",
      "warning"
    );

    return;
  }

  if(valorPagamento > saldoAtual){

    showToast(
      `Saldo pendente: ${moeda(saldoAtual)}`,
      "warning"
    );

    return;
  }

  showLoading(
    "Registrando pagamento..."
  );

  try{

    const resp =
      await postAPI({

        acao:
          "pagar_reserva",

        id,
        valor:valorPagamento

      });

    if(resp.erro){

      showToast(
        resp.erro,
        "error"
      );

      return;
    }

    showToast(
      "Pagamento registrado!",
      "success"
    );    

    limparModalPrincipal();

    await carregar();
    renderAgenda();

  }catch(error){

    console.error(error);

    showToast(
      "Erro ao registrar pagamento",
      "error"
    );

  }finally{

    hideLoading();
  }
}