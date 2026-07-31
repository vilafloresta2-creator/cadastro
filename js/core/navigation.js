/* ----------------------------------------
            NAVIGATION
---------------------------------------- */


/* ================== IR ================== */
function ir(telaNome){

  if(!telaNome){
    return;
  }

  const destino =
    String(telaNome).trim();


  /* =========================================
              VALIDAR DESTINO
  ========================================= */

  if(!SCREENS[destino]){

    console.warn(
      "Tela inválida:",
      destino
    );

    return;
  }


  /* =========================================
              JÁ ESTÁ NA TELA
  ========================================= */

  if(
    state.telaAtual === destino
  ){

    return;

  }


  /* =========================================
                ATUALIZAR STATE
  ========================================= */

  state.telaAtual =
    destino;


  /* =========================================
                MENU ATIVO
  ========================================= */

  atualizarMenu(
    destino
  );


  /* =========================================
                  RENDER
  ========================================= */

  render();

}


/* ========== MENU ATIVO ========== */
function atualizarMenu(destino){

  document

    .querySelectorAll(
      ".nav button"
    )

    .forEach(btn => {

      btn.classList.remove(
        "active"
      );

    });


  const botao =
    getEl(
      `btn_${destino}`
    );


  if(!botao){
    return;
  }


  botao.classList.add(
    "active"
  );

}