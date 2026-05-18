/* =========================================
   ALERTS
========================================= */


/* =========================================
   RESOLVERS
========================================= */

let resolveConfirm =
  null;

let resolvePrompt =
  null;


/* =========================================
   HELPERS
========================================= */

function escapeHTML(texto){

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


/* ================= ALERT ================= */
function showAlert(msg = ""){

  criarModal({

    id:"alertOverlay",

    titulo:"Aviso",

    texto:msg,

    botoes:`

      <button
        class="btn"
        onclick="fecharModalGlobal('alertOverlay')"
      >
        OK
      </button>

    `
  });
}


/* ================= CONFIRM ================= */
function showConfirm(msg = ""){

  return new Promise(resolve => {

    resolveConfirm =
      resolve;

    criarModal({

      id:"confirmOverlay",

      titulo:"Confirmação",

      texto:msg,

      botoes:`

        <button
          class="btn-light"
          onclick="
            fecharModalGlobal('confirmOverlay');
            resolveConfirm(false);
          "
        >
          Cancelar
        </button>

        <button
          class="btn"
          onclick="
            fecharModalGlobal('confirmOverlay');
            resolveConfirm(true);
          "
        >
          Confirmar
        </button>

      `
    });

  });
}


/* ================= PROMPT ================= */
function showPrompt(
  msg = "",
  valorInicial = ""
){

  return new Promise(resolve => {

    resolvePrompt =
      resolve;

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
          onclick="
            fecharModalGlobal('promptOverlay');
            resolvePrompt(null);
          "
        >
          Cancelar
        </button>

        <button
          class="btn"
          onclick="
            fecharModalGlobal('promptOverlay');
            resolvePrompt(
              document.getElementById('promptInput').value
            );
          "
        >
          OK
        </button>

      `
    });

    setTimeout(() => {

      const input =
        document.getElementById(
          "promptInput"
        );

      if(!input){
        return;
      }

      input.focus();

      input.addEventListener(
        "keydown",
        e => {

          if(e.key !== "Enter"){
            return;
          }

          fecharModalGlobal(
            "promptOverlay"
          );

          resolvePrompt(
            input.value
          );
        }
      );

    }, 100);

  });
}


/* ================= TOAST ================= */
function showToast(
  msg = "",
  tipo = "success"
){

  const id =
    "toast_" + Date.now();

  const html = `

    <div
      id="${id}"
      class="toast toast-${tipo}"
    >

      ${msg}

    </div>

  `;

  document.body.insertAdjacentHTML(
    "beforeend",
    html
  );

  const el =
    document.getElementById(id);

  requestAnimationFrame(() => {

    if(el){
      el.classList.add("show");
    }

  });

  setTimeout(() => {

    if(!el){
      return;
    }

    el.classList.remove("show");

    setTimeout(() => {

      if(el?.parentNode){
        el.remove();
      }

    }, 300);

  }, 3000);
}