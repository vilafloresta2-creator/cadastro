/* ----------------------------------------------
              CAIXA MODAL
---------------------------------------------- */

function abrirCaixaModal(item = null){

  const editando = !!item;

  state.editandoCaixa =
    item?.id || null;

  abrirModalPrincipal(`

    <div
      class="modal-box"
      onclick="event.stopPropagation()"
    >

      <h3>
        ${
          editando
            ? "Editar Lançamento"
            : "Novo Lançamento"
        }
      </h3>

      <select id="cx_tipo">

        <option
          value="Entrada"
          ${
            item?.tipo === "Entrada"
              ? "selected"
              : ""
          }
        >
          Entrada
        </option>

        <option
          value="Saída"
          ${
            item?.tipo === "Saída"
              ? "selected"
              : ""
          }
        >
          Saída
        </option>

      </select>

      <input
        id="cx_categoria"
        placeholder="Categoria"
        value="${item?.categoria || ""}"
      >

      <input
        id="cx_descricao"
        placeholder="Descrição"
        value="${item?.descricao || ""}"
      >

      <input
        id="cx_valor"
        type="number"
        step="0.01"
        placeholder="Valor"
        value="${item?.valor || ""}"
      >

      <div class="acoes">

        <button
          class="btn"
          onclick="salvarCaixaModal()"
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
}