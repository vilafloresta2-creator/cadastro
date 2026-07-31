/* ---------------------------------------- 
                MODALS
---------------------------------------- */


/* ========= ABRIR MODAL PRINCIPAL ========= */

function abrirModalPrincipal(html){

  const modal =
    getEl("modal");

  if(!modal){
    return;
  }

  modal.innerHTML =
    html;

  modal.style.display =
    "flex";

  modal.classList.add(
    "show"
  );

  document.body.style.overflow =
    "hidden";


  modal.onclick = () => {

    limparModalPrincipal();

  };


  setTimeout(() => {

    const primeiroCampo =
      modal.querySelector(
        "input, textarea, select"
      );

    if(primeiroCampo){

      primeiroCampo.focus();

    }

  }, 100);

}


/* ========= LIMPAR MODAL PRINCIPAL ========= */

function limparModalPrincipal(){

  const modal =
    getEl("modal");

  if(!modal){
    return;
  }

  modal.classList.remove(
    "show"
  );

  modal.style.display =
    "none";

  modal.innerHTML =
    "";

  document.body.style.overflow =
    "";

}


/*---------------------------------------------
            MODAL MENSALIDADE
---------------------------------------------- */


/* ========= ABRIR MODAL MENSALIDADE ========= */

function abrirModalMensalidade(){

  const associado =
    safeArray(
      state.associados
    )[0];

  if(!associado){

    showToast(
      "Nenhum associado encontrado",
      "warning"
    );

    return;
  }


  abrirModalPrincipal(`

    <div
      class="modal-box"
      onclick="event.stopPropagation()"
    >

      <h3>
        Atualizar Mensalidade
      </h3>


      <p>
        Valor atual:
      </p>


      <div class="valor-mensalidade">

        ${moeda(
          numero(
            associado.mensalidade
          )
        )}

      </div>


      <input
        id="novoValorMensalidade"
        type="number"
        placeholder="Novo valor"
      >


      <div class="acoes">

        <button
          class="btn"
          onclick="salvarMensalidade()"
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