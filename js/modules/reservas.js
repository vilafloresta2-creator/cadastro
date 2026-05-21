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

      if(!r || !r.length){
        return;
      }

      const id =
        String(r[0] || "");

      const nome =
        String(r[1] || "");

      const telefone =
        String(r[2] || "");

      const espaco =
        String(r[3] || "");

      const data =
        String(r[4] || "");

      const hora =
        String(r[5] || "");

      const valor =
        numero(r[6]);

      const pago =
        numero(r[7]);

      const saldo =
        numero(r[8]);

      const status =
        String(r[9] || "");

      html += `

        <div
          class="card"
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
    await showPrompt(
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