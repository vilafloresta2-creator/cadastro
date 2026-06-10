/* ===========================================
        FORM RESERVA MODAL
=========================================== */

function abrirFormularioReserva(reserva = {}){


  console.log("ABRIR FORM");
  console.log(modal);
  console.log("ENTROU");

  modal.innerHTML = `

    <div
      class="modal-box"
      onclick="event.stopPropagation()"
    >

      <h3>
        ${reserva.id ? "Editar Reserva" : "Nova Reserva"}
      </h3>

      <label>Associado</label>

      <select id="frm_associado">

        <option value="">
          Reserva Avulsa
        </option>

      </select>

      <input
        id="frm_nome"
        placeholder="Nome"
        value="${reserva.nome || ""}"
      >

      <input
        id="frm_telefone"
        placeholder="Telefone"
        value="${reserva.telefone || ""}"
      >

      <input
        id="frm_espaco"
        placeholder="Espaço"
        value="${reserva.espaco || ""}"
      >

      <input
        id="frm_data"
        type="date"
        value="${reserva.data || ""}"
      >

      <input
        id="frm_hora"
        type="time"
        value="${reserva.hora || ""}"
      >

      <input
        id="frm_valor"
        type="number"
        step="0.01"
        placeholder="Valor"
        value="${reserva.valor || ""}"
      >

      <textarea
        id="frm_obs"
        placeholder="Observações"
      >${reserva.observacao || ""}</textarea>

      <div class="acoes">

        <button
          class="btn"
          onclick="salvarFormularioReserva('${reserva.id || ""}')"
        >
          💾 Salvar
        </button>

        ${reserva.id ? `

          <button
            class="btn-recibo"
            onclick="receberReservaFormulario('${reserva.id}')"
          >
            💰 Receber
          </button>

          <button
            class="btn-cancelar"
            onclick="excluirReservaFormulario('${reserva.id}')"
          >
            🗑 Excluir
          </button>

        ` : ""}

        <button
          class="btn-cancelar"
          onclick="modal.classList.remove('show')"
        >
          Cancelar
        </button>

      </div>

    </div>

  `;

  const selectAssociado =
    getEl("frm_associado");

  if(selectAssociado){

    selectAssociado.innerHTML = `

      <option value="">
        Reserva Avulsa
      </option>

      ${safeArray(state.associados)

        .map(a => `

          <option value="${a.id}">
            ${a.nome}
          </option>

        `)

        .join("")}

    `;

    selectAssociado.onchange = () => {

    const associado =

      safeArray(state.associados)

        .find(a =>

          String(a.id)

          ===

          String(selectAssociado.value)

        );

    if(!associado){

      getEl("frm_nome").value = "";
      getEl("frm_telefone").value = "";

      return;
    }

    getEl("frm_nome").value =
      associado.nome || "";

    getEl("frm_telefone").value =
      maskTelefone(
        associado.telefone || ""
      );

  };  
    
  }

  console.log("HTML GERADO");
  console.log(modal.innerHTML);
    modal.style.display = "flex";
  modal.classList.add("show"); 

}


/* ---------------------------------------------- */
async function salvarFormularioReserva(id){

  const dados = {

    id,

    associadoId:
      getEl("frm_associado")?.value || "",

    nome:
      getEl("frm_nome")?.value?.trim(),

    telefone:
      getEl("frm_telefone")?.value?.trim(),

    espaco:
      getEl("frm_espaco")?.value?.trim(),

    data:
      getEl("frm_data")?.value,

    hora:
      getEl("frm_hora")?.value,

    valor:
      Number(
        getEl("frm_valor")?.value || 0
      ),

    observacao:
      getEl("frm_obs")?.value?.trim()
  };

  limparErrosCampos();

let valido = true;

const nome =
  getEl("frm_nome");

const telefone =
  getEl("frm_telefone");

const espaco =
  getEl("frm_espaco");

const data =
  getEl("frm_data");

const hora =
  getEl("frm_hora");

const valor =
  getEl("frm_valor");  

if(!nome?.value.trim()){

  marcarErro(nome);

  valido = false;
}

if(!telefone?.value.trim()){

  marcarErro(telefone);

  valido = false;
}

if(!espaco?.value.trim()){

  marcarErro(espaco);

  valido = false;
}

if(!data?.value){

  marcarErro(data);

  valido = false;
}

if(!hora?.value){

  marcarErro(hora);

  valido = false;
}

if(!valor?.value){

  marcarErro(valor);

  valido = false;
}

if(!valido){

  showToast(
    "Preencha os campos obrigatórios",
    "warning"
  );

  return;
}

  try{

    showLoading(
      "Salvando reserva..."
    );

    const resp =
      await postAPI({

        acao:"salvar_reserva",

        ...dados
      });

    if(resp.erro){

      showToast(
        resp.erro,
        "error"
      );

      return;
    }

    closeModal("modal");

    await carregar();

    if(
      state.telaAtual === "agenda"
    ){

      renderAgenda();

    }else{

      renderReservas();
    }

    showToast(
      id
        ? "Reserva atualizada"
        : "Reserva criada",
      "success"
    );

  }catch(error){

    console.error(error);

    showToast(
      "Erro ao salvar",
      "error"
    );

  }finally{

    hideLoading();
  }
}

/* ----------------------------------------- */
async function receberReservaFormulario(id){

  const reserva =

    safeArray(state.reservas)
      .map(r => reservaObj(r))
      .find(
        r => String(r.id) === String(id)
      );

  if(!reserva){
    return;
  }

  abrirModalRecebimentoReserva(
    reserva
  );
}

/* ----------------------------------------- */
function abrirModalRecebimentoReserva(
  reserva
){

  modal.innerHTML = `

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
          onclick="
            modal.classList.remove('show')
          "
        >
          Cancelar
        </button>

      </div>

    </div>

  `;

  modal.classList.add("show");
}

/* ----------------------------------------- */
async function confirmarRecebimentoReserva(
  id
){

  const valor = Number(
    getEl("valorRecebimento")?.value || 0
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