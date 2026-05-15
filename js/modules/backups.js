/* ============== LISTAR BACKUPS ============== */
function listarBackups(){

  if(!backups.length){

    document.getElementById("listaBackups").innerHTML = `
      <div class="card">
        Nenhum backup encontrado.
      </div>
    `;

    return;
  }

  let html = "";

  backups.slice().reverse().forEach(b => {

    const data = formatarData(b[0]);
    const nome = b[1];
    const link = b[2];

    html += `
      <div class="card" style="display:flex;justify-content:space-between;align-items:center;">
        
        <div>
          <b>${nome}</b><br>
          <small>${data}</small>
        </div>

        <div style="display:flex;gap:6px;">
          <button class="btn" onclick="window.open('${link}','_blank')">
            Abrir
          </button>

          <button class="btn-light" onclick="restaurarBackup('${link}')">
            Restaurar
          </button>
        </div>

      </div>
    `;
  });

  document.getElementById("listaBackups").innerHTML = html;
}


/* ============== RENDER BACKUPS ============== */
function renderBackups(){

  tela.innerHTML = `
    <button class="btn" onclick="fazerBackup(event)">
      💾 Fazer Backup
    </button>

    <div id="listaBackups" style="margin-top:10px;"></div>
  `;

  listarBackups();
}


/* =============== FAZER BACKUP =============== */
async function fazerBackup(ev){

  let btn = ev?.target;

  if(btn){
    btn.innerText = "Salvando...";
    btn.disabled = true;
  }

  try{

    const resp = await postAPI({
      acao:"backup"
    });

    if(resp.erro){
      alert(resp.erro);
      return;
    }

    await carregar();

    if(confirm("Backup criado! Deseja abrir agora?")){
      window.open(resp.url, "_blank");
    }

  }catch(e){
    alert("Erro ao gerar backup");
  }

  if(btn){
    btn.innerText = "💾 Fazer Backup";
    btn.disabled = false;
  }
}


/* ============= RESTAURAR BACKUP ============= */
async function restaurarBackup(url){

  if(!confirm("⚠️ Isso vai substituir TODOS os dados. Continuar?")) return;

  await postAPI({    
      acao:"restore",
      url    
  });

  alert("Backup restaurado!");
  await carregar();
}