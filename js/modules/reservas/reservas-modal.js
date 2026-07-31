/* ---------------------------------------------- 
              RESERVA MODAL
 ---------------------------------------------- */

/* ================= ABRIR ================= */
function abrirReservaForm(reserva = {}){  

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


      <input id="frm_nome" placeholder="Nome">

      <input id="frm_telefone" placeholder="Telefone">

      <input id="frm_espaco" placeholder="Espaço">

      <input id="frm_data" type="date">

      <input id="frm_hora" type="time">

      <input
        id="frm_valor"
        type="number"
        step="0.01"
        placeholder="Valor"
      >

      <textarea
        id="frm_obs"
        placeholder="Observações"
      ></textarea>


      <div class="acoes">

        <button
          class="btn"
          onclick="salvarReservaForm('${reserva.id || ""}')"
        >
          💾 Salvar
        </button>

        ${reserva.id ? `

          <button
            class="btn-recibo"
            onclick="receberReserva('${reserva.id}')"
          >
            💰 Receber
          </button>

          <button
            class="btn-cancelar"
            onclick="excluirReserva('${reserva.id}')"
          >
            🗑 Excluir
          </button>

        ` : ""}

        <button
          class="btn-cancelar"
          onclick="limparModalPrincipal()"
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

    if(reserva.associadoId){

      selectAssociado.dispatchEvent(
        new Event("change")
      );
    }

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

    modal.style.display = "flex";

    modal.classList.add("show"); 

    preencherReservaForm(reserva);

}