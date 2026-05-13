/* ================= RENDER BACKUPs ================= */
function renderBackups(){

  tela.innerHTML = `
    <button class="btn" onclick="fazerBackup(event)">
      💾 Fazer Backup
    </button>

    <div id="listaBackups" style="margin-top:10px;"></div>
  `;

  listarBackups();
}

/* ================= LISTAR BACKUPS ================= */
function listarBackups(){

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
          <button class="btn" onclick="window.open('${link}')">Abrir</button>
          <button class="btn-light" onclick="restaurarBackup('${link}')">Restaurar</button>
        </div>

      </div>
    `;
  });

  document.getElementById("listaBackups").innerHTML = html;
}