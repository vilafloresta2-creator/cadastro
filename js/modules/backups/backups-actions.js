/* ----------------------------------------------
                  BACKUPS ACTIONS
---------------------------------------------- */

/* =============== ABRIR BACKUP =============== */
function abrirBackup(url){

  if(!url){

    showToast(
      "Link do backup inválido",
      "error"
    );

    return;
  }

  window.open(
    url,
    "_blank"
  );
}


/* =============== FAZER BACKUP =============== */
async function fazerBackup(ev){

  const btn =
    ev?.target;

  if(btn){

    btn.disabled = true;
    btn.innerText = "Salvando...";

  }

  try{

    const resp =
      await fazerBackupAPI();

    if(!resp){
      return;
    }

    await carregar();

    listarBackups();

    const abrir =
      await showConfirm(
        "Deseja abrir o backup agora?"
      );

    if(
      abrir &&
      resp.url
    ){

      abrirBackup(
        resp.url
      );

    }

  }finally{

    if(btn){

      btn.disabled = false;
      btn.innerText = "💾 Fazer Backup";

    }

  }

}


/* ============= RESTAURAR BACKUP ============= */
async function restaurarBackup(url){

  if(!url){

    showToast(
      "Backup inválido",
      "error"
    );

    return;
  }

  const confirmar =
    await showConfirm(
      "⚠️ Isso vai substituir TODOS os dados. Continuar?"
    );

  if(!confirmar){
    return;
  }

  const ok =
    await restaurarBackupAPI(url);

  if(!ok){
    return;
  }

  await carregar();

  listarBackups();

}