/* =========================================
   INIT
========================================= */


/* ========== INIT LOCK ========== */
let appInicializado =
  false;


/* ========== INICIAR APP ========== */
async function init(){

  if(appInicializado){
    return;
  }

  appInicializado = true;

  try{

    showLoading(
      "Carregando sistema..."
    );

    await carregar();

    ir("dashboard");

    bindGlobalEvents();

  }catch(error){

    console.error(
      "INIT ERROR:",
      error
    );

    showToast(
      "Erro ao iniciar sistema",
      "error"
    );

  }finally{

    hideLoading();
  }
}


/* ========== EVENTOS GLOBAIS ========== */
function bindGlobalEvents(){

  document.addEventListener(
    "keydown",
    handleGlobalKeydown
  );
}


/* ========== TECLAS GLOBAIS ========== */
function handleGlobalKeydown(e){

  /* ESC */
  if(e.key === "Escape"){

    fecharModal?.();

    fecharModalMensalidade?.();

    fecharModalGlobal?.(
      "alertOverlay"
    );

    fecharModalGlobal?.(
      "confirmOverlay"
    );

    fecharModalGlobal?.(
      "promptOverlay"
    );
  }
}


/* ========== START APP ========== */
document.addEventListener(
  "DOMContentLoaded",
  init
);