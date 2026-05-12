console.log("JS carregado");
const tela = document.getElementById("tela");
const API = "https://script.google.com/macros/s/AKfycbx28WB6HlWGyC2Larm3DgF3n1DMYH5VfEWvwyNYCSxmv2AJy1MWWZAyM00UAosLeqq8/exec";

let associados = [];
let cobrancas = [];
let fechamentos = [];
let editandoCaixa = null;
let caixa = [];
let telaAtual = "dashboard";
let recibos = [];
let fixas = [];
let backups = []; 

/* ================= NAVEGAÇÃO ================= */

function ir(telaNome){

  telaAtual = telaNome;

  document
    .querySelectorAll(".nav button")
    .forEach(btn => btn.classList.remove("active"));

  const botao = document.getElementById("btn_" + telaNome);

  if(botao){
    botao.classList.add("active");
  }

  render();
}

/* ================= RENDER ================= */

function render(){

  if(telaAtual === "dashboard"){
    renderDashboard();
  }

  if(telaAtual === "cobrancas"){
    renderCobrancas();
  }

  if(telaAtual === "associados"){
    renderAssociados();
  }
}

/* ================= INIT ================= */

async function init(){

  await carregar();

  ir("dashboard");
}

init();

/* ================= EVENTOS ================= */

document.addEventListener("input", e => {

  if(e.target.id === "m_cpf"){
    e.target.value = maskCPF(e.target.value);
  }

  if(e.target.id === "m_tel"){
    e.target.value = maskTel(e.target.value);
  }
});

document.addEventListener("keydown", e => {

  if(e.key === "Escape"){

    fecharModal?.();
    fecharModalMensalidade?.();
  }
});
