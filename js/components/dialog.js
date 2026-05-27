/* =========================================
   DIALOGS
========================================= */


/* ========== ESCAPE HTML ========== */
function escapeHTML(texto = ""){

  return String(texto || "")

    .replace(/&/g,"&amp;")

    .replace(/</g,"&lt;")

    .replace(/>/g,"&gt;")

    .replace(/"/g,"&quot;")

    .replace(/'/g,"&#039;");
}


/* ========== FECHAR MODAL GLOBAL ========== */
function fecharModalGlobal(id){

  const el =
    document.getElementById(id);

  if(el){
    el.remove();
  }
}


/* ========== FECHAR TODOS MODAIS ========== */
function fecharTodosModais(){

  fecharModal?.();

  fecharModalMensalidade?.();

  fecharModalGlobal(
    "alertOverlay"
  );

  fecharModalGlobal(
    "confirmOverlay"
  );

  fecharModalGlobal(
    "promptOverlay"
  );
}


/* ========== CRIAR MODAL ========== */
function criarModal({
  id,
  titulo = "Aviso",
  texto = "",
  conteudo = "",
  botoes = ""
}){

  fecharModalGlobal(id);

  const html = `

    <div
      class="modal-overlay show"
      id="${id}"
    >

      <div class="modal-box modal-alert">

        <div class="modal-title">
          ${titulo}
        </div>

        <div class="modal-text">
          ${texto}
        </div>

        ${conteudo}

        <div class="modal-actions">
          ${botoes}
        </div>

      </div>

    </div>

  `;

  document.body.insertAdjacentHTML(
    "beforeend",
    html
  );

  return document.getElementById(id);
}


/* =========================================
   ALERT
========================================= */

function showAlert(msg = ""){

  criarModal({

    id:"alertOverlay",

    titulo:"Aviso",

    texto:msg,

    botoes:`

      <button
        class="btn"
        onclick="
          fecharModalGlobal('alertOverlay')
        "
      >
        OK
      </button>

    `
  });
}


/* =========================================
   CONFIRM
========================================= */

function showConfirm(msg = ""){

  return new Promise(resolve => {

    criarModal({

      id:"confirmOverlay",

      titulo:"Confirmação",

      texto:msg,

      botoes:`

        <button
          class="btn-light"
          id="btnCancelConfirm"
        >
          Cancelar
        </button>

        <button
          class="btn"
          id="btnOkConfirm"
        >
          Confirmar
        </button>

      `
    });

    const btnCancel =
      document.getElementById(
        "btnCancelConfirm"
      );

    const btnOk =
      document.getElementById(
        "btnOkConfirm"
      );

    btnCancel.onclick = () => {

      fecharModalGlobal(
        "confirmOverlay"
      );

      resolve(false);
    };

    btnOk.onclick = () => {

      fecharModalGlobal(
        "confirmOverlay"
      );

      resolve(true);
    };

  });
}


/* =========================================
   PROMPT
========================================= */

function showPrompt(
  msg = "",
  valorInicial = ""
){

  return new Promise(resolve => {

    criarModal({

      id:"promptOverlay",

      titulo:"Informe",

      texto:msg,

      conteudo:`

        <input
          id="promptInput"
          value="${escapeHTML(valorInicial)}"
          style="margin-top:10px;"
        >

      `,

      botoes:`

        <button
          class="btn-light"
          id="btnCancelPrompt"
        >
          Cancelar
        </button>

        <button
          class="btn"
          id="btnOkPrompt"
        >
          OK
        </button>

      `
    });

    const input =
      document.getElementById(
        "promptInput"
      );

    const btnCancel =
      document.getElementById(
        "btnCancelPrompt"
      );

    const btnOk =
      document.getElementById(
        "btnOkPrompt"
      );

    input.focus();

    btnCancel.onclick = () => {

      fecharModalGlobal(
        "promptOverlay"
      );

      resolve(null);
    };

    btnOk.onclick = () => {

      fecharModalGlobal(
        "promptOverlay"
      );

      resolve(input.value);
    };

    input.addEventListener(
      "keydown",
      e => {

        if(e.key !== "Enter"){
          return;
        }

        fecharModalGlobal(
          "promptOverlay"
        );

        resolve(input.value);
      }
    );

  });
}