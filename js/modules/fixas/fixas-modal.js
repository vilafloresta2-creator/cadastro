/* ----------------------------------------------
                  FIXAS MODAL
---------------------------------------------- */


/* ================= MODAL ================= */
function abrirFixaModal(fixa = null){

  const editando =
    !!fixa;


  state.editandoFixaId =
    fixa?.id || null;


  abrirModalPrincipal(`

    <div
      class="modal-box"
      onclick="event.stopPropagation()"
    >

      <h3>

        ${
          editando
            ? "Editar Despesa Fixa"
            : "Nova Despesa Fixa"
        }

      </h3>


      <input
        id="fx_categoria"
        placeholder="Categoria"
      >


      <input
        id="fx_descricao"
        placeholder="Descrição"
      >


      <input
        id="fx_valor"
        type="number"
        step="0.01"
        placeholder="Valor"
      >


      <input
        id="fx_dia"
        type="number"
        min="1"
        max="31"
        placeholder="Dia do mês"
      >


      <div class="acoes">

        ${renderButton({

          texto:"💾 Salvar",

          classe:"btn",

          onclick:
            "salvarFixasForm()"

        })}


        ${renderButton({

          texto:"Cancelar",

          classe:"btn-cancelar",

          onclick:
            "limparModalPrincipal()"

        })}

      </div>

    </div>

  `);


  if(editando){

    preencherFixaForm(
      fixa
    );

  }


  focusInput(
    "fx_categoria"
  );

}