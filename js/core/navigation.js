/* =========================================
   NAVIGATION
========================================= */


/* ================== IR ================== */
function ir(telaNome){

  if(!telaNome){
    return;
  }

  const destino =

    String(telaNome)
      .trim();

  /* =========================================
     TELA INVÁLIDA
  ========================================= */

  if(
    !SCREENS[destino]
  ){

    console.warn(
      "Tela inválida:",
      destino
    );

    return;
  }

  /* =========================================
     EVITA RERENDER
  ========================================= */

  if(
    state.telaAtual
    ===
    destino
  ){

    return;
  }

  state.telaAtual =
    destino;


  /* =========================================
     REMOVE ACTIVE
  ========================================= */

  document

    .querySelectorAll(
      ".nav button"
    )

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
      "btn_" + destino
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