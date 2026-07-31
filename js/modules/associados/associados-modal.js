/* ---------------------------------------------- 
             ASSOCIADOS MODAL
 ---------------------------------------------- */

/* ========= ABRIR MODAL ========= */
function abrirAssociadoModal(associado = null){

  const editando = !!associado;

  state.editandoId =
  associado?.id || null;

  abrirModalPrincipal(`

    <div
      class="modal-box"
      onclick="event.stopPropagation()"
    >

      <h3>
        ${
          editando
            ? "Editar Associado"
            : "Novo Associado"
        }
      </h3>

      <input
        id="m_nome"
        placeholder="Nome"
        value="${associado?.nome || ""}"
      >

      <input
        id="m_cpf"
        placeholder="CPF"
        value="${maskCPF(associado?.cpf || "")}"
      >

      <input
        id="m_tel"
        placeholder="WhatsApp"
        value="${associado?.telefone || ""}"
      >

      <input
        id="m_email"
        placeholder="Email"
        value="${associado?.email || ""}"
      >

      <input
        id="m_endereco"
        placeholder="Endereço"
        value="${associado?.endereco || ""}"
      >

      <input
        id="m_mensal"
        placeholder="Mensalidade"
        value="${associado?.mensalidade || ""}"
      >

      <select id="m_status">

        <option
          value="Ativo"
          ${
            associado?.status !== "Inativo"
              ? "selected"
              : ""
          }
        >
          Ativo
        </option>

        <option
          value="Inativo"
          ${
            associado?.status === "Inativo"
              ? "selected"
              : ""
          }
        >
          Inativo
        </option>

      </select>

      <div class="acoes">

        <button
          id="btnSalvar"
          class="btn"
          onclick="salvarAssociadoModal()"
        >
          Salvar
        </button>

        <button
          class="btn-cancelar"
          onclick="limparModalPrincipal()"
        >
          Cancelar
        </button>

      </div>

    </div>

  `);

  focusInput("m_nome");
}