/* =========================================
   INIT
========================================= */


/* ========== INIT LOCK ========== */
let appInicializado =
  false;

let eventosGlobaisBindados =
  false;


/* ========== INICIAR APP ========== */
async function init(){

  if(appInicializado){
    return;
  }

  try{

    showLoading(
      "Carregando sistema..."
    );

    const carregou =
      await carregar();

    if(!carregou){

      throw new Error(
        "Falha ao carregar dados"
      );
    }

    bindGlobalEvents();

    render();

    appInicializado =
      true;

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

  if(
    eventosGlobaisBindados
  ){
    return;
  }

  eventosGlobaisBindados =
    true;

  document.addEventListener(
    "keydown",
    handleGlobalKeydown
  );
}


/* ========== TECLAS GLOBAIS ========== */
function handleGlobalKeydown(e){

  /* ESC */
  if(e.key === "Escape"){

    fecharTodosModais?.();
  }
}


/* ========== START APP ========== */
document.addEventListener(
  "DOMContentLoaded",
  init
);