function ir(telaNome){

  telaAtual = telaNome;

  document.querySelectorAll(".nav button")
    .forEach(b => b.classList.remove("active"));

  document.getElementById("btn_" + telaNome)
    ?.classList.add("active");

  render();
}