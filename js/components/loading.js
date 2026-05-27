/* =========================================
   LOADING
========================================= */


/* ========== SHOW LOADING ========== */
function showLoading(
  texto = "Carregando..."
){

  let overlay =
    document.getElementById(
      "loadingOverlay"
    );

  if(!overlay){

    const html = `

      <div
        class="loading-overlay"
        id="loadingOverlay"
      >

        <div class="loading-box">

          <div class="loading-spinner"></div>

          <div class="loading-text"></div>

        </div>

      </div>

    `;

    document.body.insertAdjacentHTML(
      "beforeend",
      html
    );

    overlay =
      document.getElementById(
        "loadingOverlay"
      );
  }

  const textoEl =
    overlay.querySelector(
      ".loading-text"
    );

  if(textoEl){

    textoEl.innerText =
      texto;
  }

  overlay.classList.add("show");
}


/* ========== HIDE LOADING ========== */
function hideLoading(){

  const el =
    document.getElementById(
      "loadingOverlay"
    );

  if(!el){
    return;
  }

  el.classList.remove("show");
}