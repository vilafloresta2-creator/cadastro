/* =========================================
   NAVIGATION
========================================= */


/* ================== IR ================== */
function ir(telaNome){

  if(!telaNome){
    return;
  }

  state.telaAtual =

    String(telaNome)
      .trim();


  /* =========================================
     REMOVE ACTIVE
  ========================================= */

  document

    .querySelectorAll(".nav button")

    .forEach(btn => {

      btn.classList.remove(
        "active"
      );

    });


  /* =========================================
     ACTIVE BUTTON
  ========================================= */

  const botao =

    document.getElementById(
      "btn_" + state.telaAtual
    );

  if(botao){

    botao.classList.add(
      "active"
    );
  }


  /* =========================================
     RENDER
  ========================================= */

  render();
}