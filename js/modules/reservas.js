/* =========================================
   RESERVAS
========================================= */


/* ============== RENDER RESERVAS ============== */
function renderReservas(){

  tela.innerHTML = `

    <div class="card">

      <h3>
        Nova Reserva
      </h3>

      <div class="grid-2">

        <input
          id="rv_nome"
          placeholder="Nome"
        >

        <input
          id="rv_telefone"
          placeholder="Telefone"
        >

      </div>

      <div
        class="grid-2"
        style="margin-top:10px;"
      >

        <input
          id="rv_espaco"
          placeholder="Espaço"
        >

        <input
          id="rv_data"
          type="date"
        >

      </div>

      <div
        class="grid-2"
        style="margin-top:10px;"
      >

        <input
          id="rv_hora"
          type="time"
        >

        <input
          id="rv_valor"
          type="number"
          step="0.01"
          placeholder="Valor"
        >

      </div>

      <textarea
        id="rv_obs"
        placeholder="Observações"
        style="
          margin-top:10px;
          width:100%;
          min-height:80px;
        "
      ></textarea>

      <button
        class="btn"
        style="margin-top:12px;"
        onclick="salvarReserva()"
      >
        💾 Salvar Reserva
      </button>      

    </div>

    <div id="listaReservas"></div>

  `;

  listarReservas();
}


/* ============== LISTAR RESERVAS ============== */
function listarReservas(){

  const listaEl =
    document.getElementById(
      "listaReservas"
    );

  if(!listaEl){
    return;
  }

  const lista =
    safeArray(state.reservas);

  if(!lista.length){

    listaEl.innerHTML = `

      <div class="card">
        Nenhuma reserva cadastrada.
      </div>

    `;

    return;
  }

  let html = "";

  lista
    .slice()
    .reverse()

    .forEach(r => {      
    

      const reserva =
        reservaObj(r);

      if(!reserva.id){
        return;
      }  

      const id =
        String(reserva.id);

      const nome =
        String(reserva.nome);

      const telefone =
        String(reserva.telefone);

      const espaco =
        String(reserva.espaco);

      const data =
        String(reserva.data);

      const hora =
        String(reserva.hora);

      const valor =
        reserva.valor;

      const pago =
        reserva.pago;

      const saldo =
        reserva.saldo;

      const status =
        String(reserva.status);

      html += `

        <div
          class="card"
          id="reserva_${id}"
          style="
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
                ${nome}
              </div>

              <div style="
                opacity:.7;
                font-size:13px;
                margin-top:4px;
              ">
                ${telefone}
              </div>

              <div style="
                margin-top:8px;
              ">
                📍 ${espaco}
              </div>

              <div>
                📅 ${data} às ${hora}
              </div>

            </div>

            <div style="
              text-align:right;
            ">

              <div>
                <b>Total:</b>
                ${moeda(valor)}
              </div>

              <div>
                <b>Pago:</b>
                ${moeda(pago)}
              </div>

              <div>
                <b>Saldo:</b>
                ${moeda(saldo)}
              </div>

              <div style="
                margin-top:8px;
                font-weight:bold;
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

          <div style="
            display:flex;
            gap:8px;
            margin-top:12px;
            flex-wrap:wrap;
          ">

            <button
              class="btn"
              onclick="abrirPagamentoReserva('${id}')"
            >
              💰 Pagamento
            </button>

            <button
              class="btn"
              onclick="gerarContratoReserva('${id}')"
            >
              📄 Contrato
            </button>

            <button
              class="btn"
              onclick="enviarWhatsReserva('${id}')"
            >
              📲 WhatsApp
            </button>

            <button
              class="btn-cancelar"
              onclick="excluirReservaFrontend('${id}')"
            >
              🗑️ Excluir
            </button>

          </div>

        </div>

      `;
    });

  listaEl.innerHTML = html;
}


/* ============== SALVAR RESERVA ============== */
async function salvarReserva(){

  const nome =
    document.getElementById(
      "rv_nome"
    )?.value?.trim();

  const telefone =
    document.getElementById(
      "rv_telefone"
    )?.value?.trim();

  const espaco =
    document.getElementById(
      "rv_espaco"
    )?.value?.trim();

  const data =
    document.getElementById(
      "rv_data"
    )?.value?.trim();

  const hora =
    document.getElementById(
      "rv_hora"
    )?.value?.trim();

  const valor =
    numero(
      document.getElementById(
        "rv_valor"
      )?.value
    );

  const observacao =
    document.getElementById(
      "rv_obs"
    )?.value?.trim();

  if(
    !nome ||
    !espaco ||
    !data ||
    !hora ||
    !valorPositivo(valor)
  ){

    showToast(
      "Preencha os campos corretamente",
      "warning"
    );

    return;
  }

  showLoading(
    "Salvando reserva..."
  );

  try{

    const resp =
      await postAPI({

        acao:"salvar_reserva",

        nome,
        telefone,
        espaco,
        data,
        hora,
        valor,
        observacao

      });

    if(resp.erro){

      showToast(
        resp.erro,
        "error"
      );

      return;
    }

    showToast(
      "Reserva salva!",
      "success"
    );

    await carregar();    
    
    renderReservas();
    showToast("Reserva salva!", "success");

  }catch(error){

    console.error(error);

    showToast(
      "Erro ao salvar reserva",
      "error"
    );

  }finally{

    hideLoading();
  }
}


/* ============== EXCLUIR RESERVA ============== */
async function excluirReservaFrontend(id){

  const confirmar =
    await showConfirm(
      "Excluir reserva?"
    );

  if(!confirmar){
    return;
  }

  showLoading(
    "Excluindo reserva..."
  );

  try{

    const resp =
      await postAPI({

        acao:"excluir_reserva",

        id

      });

    if(resp.erro){

      showToast(
        resp.erro,
        "error"
      );

      return;
    }

    showToast(
      "Reserva excluída!",
      "success"
    );

    await carregar();    
    renderReservas();
    showToast("Reserva excluída", "success");

  }catch(error){

    console.error(error);

    showToast(
      "Erro ao excluir reserva",
      "error"
    );

  }finally{

    hideLoading();
  }
}

/* ================= PAGAMENTO ================= */
async function abrirPagamentoReserva(id){

  const valor =
    window.prompt(
      "Valor recebido"
    );

  if(!valor){
    return;
  }

  const numero =
    Number(valor);

  if(
    isNaN(numero)
    ||
    numero <= 0
  ){

    showToast(
      "Valor inválido",
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
        valor:numero

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

    await carregar();
    renderReservas();

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

/* ================= WHATSAPP ================= */
function enviarWhatsReserva(id){

  const item =
    safeArray(state.reservas)
      .find(r => {

        const reserva =
          reservaObj(r);

        return (

          String(reserva.id)

          ===

          String(id)

        );

      });

  const reserva =
    reservaObj(item);

  if(!reserva){

    showToast(
      "Reserva não encontrada",
      "error"
    );

    return;
  }

  const nome =
    reserva.nome;

  let telefone =
    reserva.telefone;

  const espaco =
    reserva.espaco;

  const data =
    reserva.data;

  const hora =
    reserva.hora;

  const valor =
    moeda(reserva.valor);

  const pago =
    moeda(reserva.pago);

  const saldo =
    moeda(reserva.saldo);

  const status =
    reserva.status;

  telefone =
    telefone.replace(/\D/g,'');

  if(!telefone){

    showToast(
      "Telefone não informado",
      "warning"
    );

    return;
  }

  const mensagem = `

Olá ${nome}!

Sua reserva foi registrada com sucesso.

📍 Espaço: ${espaco}
📅 Data: ${data}
🕒 Hora: ${hora}

💰 Valor: ${valor}
✅ Pago: ${pago}
📌 Saldo: ${saldo}

Status: ${status}

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

  const item =
    safeArray(state.reservas)
      .find(r => {

        const reserva =
          reservaObj(r);

        return (

          String(reserva.id)

          ===

          String(id)

        );

      });

  const reserva =
    reservaObj(item);

  if(!reserva){

    showToast(
      "Reserva não encontrada",
      "error"
    );

    return;
  }

  const nome =
    reserva.nome;

  const telefone =
    reserva.telefone;

  const espaco =
    reserva.espaco;

  const data =
    (reserva.data);

  const hora =
    reserva.hora;

  const valor =
    moeda(reserva.valor);

  const pago =
    moeda(reserva.pago);

  const saldo =
    moeda(reserva.saldo);

  const status =
    reserva.status;

  const janela =
    window.open(
      "",
      "_blank"
    );

  janela.document.write(`

    <html>

      <head>

        <title>
          Contrato Reserva
        </title>

        <style>

          body{
            font-family:Arial;
            padding:40px;
            line-height:1.6;
            color:#111;
          }

          h1{
            text-align:center;
          }

          .bloco{
            margin-top:20px;
          }

          .assinatura{
            margin-top:80px;
          }

        </style>

      </head>

      <body>

        <h1>
          CONTRATO DE RESERVA
        </h1>

        <div class="bloco">

          <b>Nome:</b>
          ${nome}

          <br>

          <b>Telefone:</b>
          ${telefone}

          <br><br>

          <b>Espaço:</b>
          ${espaco}

          <br>

          <b>Data:</b>
          ${data}

          <br>

          <b>Hora:</b>
          ${hora}

          <br><br>

          <b>Valor Total:</b>
          ${valor}

          <br>

          <b>Valor Pago:</b>
          ${pago}

          <br>

          <b>Saldo:</b>
          ${saldo}

          <br>

          <b>Status:</b>
          ${status}

        </div>

        <div class="bloco">

          Declaro estar ciente das regras
          de utilização do espaço comunitário,
          responsabilizando-me por eventuais
          danos causados durante o evento.

        </div>

        <div class="assinatura">

          ___________________________________

          <br>

          Assinatura do Responsável

        </div>

      </body>

    </html>

  `);

  janela.document.close();

  janela.print();
}

/* ------------------------------------- */
function limparFormularioReserva(){

  setValue("rv_nome","");
  setValue("rv_telefone","");
  setValue("rv_espaco","");
  setValue("rv_data","");
  setValue("rv_hora","");
  setValue("rv_valor","");
  setValue("rv_obs","");

}