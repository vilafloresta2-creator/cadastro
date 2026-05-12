async function init(){

  await carregar();

  ir("dashboard");
}

init();

document.addEventListener("keydown",(e)=>{

  if(e.key === "Escape"){

    if(typeof fecharModal === "function"){
      fecharModal();
    }

    if(typeof fecharModalMensalidade === "function"){
      fecharModalMensalidade();
    }

  }

});