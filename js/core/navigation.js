/* =========================================
   NAVIGATION
========================================= */


/* ================== IR ================== */
function ir(telaNome){

  if(!telaNome){
    return;
  }

  telaAtual =

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
      "btn_" + telaAtual
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