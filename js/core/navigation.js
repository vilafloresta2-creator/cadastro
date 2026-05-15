function ir(telaNome){

  if(!telaNome){
    return;
  }

  telaAtual = telaNome;

  document.querySelectorAll(".nav button")
    .forEach(btn => {
      btn.classList.remove("active");
    });

  document.getElementById("btn_" + telaNome)
    ?.classList.add("active");

  render();
}