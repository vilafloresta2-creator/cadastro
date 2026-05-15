async function init(){

  await carregar();

  ir("dashboard");
}

init();

document.addEventListener("keydown",(e)=>{

  if(e.key !== "Escape"){
    return;
  }

  fecharModal?.();
  fecharModalMensalidade?.();

});