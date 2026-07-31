/* ----------------------------------------------
                  BACKUPS RENDER
---------------------------------------------- */

/* ============== RENDER BACKUPS ============== */
function renderBackups(){

  setHTML(

    "tela",

    `

      <div class="card">

        <div style="
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:10px;
          flex-wrap:wrap;
        ">

          <div>

            <h3 style="margin:0;">
              Backups do Sistema
            </h3>

            <p style="
              margin-top:5px;
              opacity:.7;
              font-size:13px;
            ">

              Faça backups antes de alterações importantes.

            </p>

          </div>

          <button
            class="btn"
            id="btnBackup"
            onclick="fazerBackup(event)"
          >

            💾 Fazer Backup

          </button>

        </div>

      </div>

      <div
        id="listaBackups"
        style="margin-top:10px;"
      ></div>

    `

  );

  listarBackups();

}


/* ============== LISTAR BACKUPS ============== */
function listarBackups(){

  const listaEl =
    getEl("listaBackups");

  if(!listaEl){
    return;
  }

  const lista =

    safeArray(state.backups)

      .map(backupObj);

  if(!lista.length){

    setHTML(

      "listaBackups",

      renderListaVazia(
        "Nenhum backup encontrado."
      )

    );

    return;

  }

  setHTML(

    "listaBackups",

    lista

      .slice()

      .reverse()

      .map(renderBackupCard)

      .join("")

  );

}


/* ============== RENDER BACKUP CARD ============== */
function renderBackupCard(backup){

  return renderCardPadrao({

    classe:
      "backup-card",

    titulo:
      backup.nome || "Backup",

    detalhe:
      formatarData(
        backup.data
      ),

    botao:

      renderActions(`

        ${renderButton({

          texto:"Abrir",

          classe:"btn",

          onclick:`
            event.stopPropagation();
            abrirBackup('${backup.link}');
          `

        })}

        ${renderButton({

          texto:"Restaurar",

          classe:"btn",

          onclick:`
            event.stopPropagation();
            restaurarBackup('${backup.link}');
          `

        })}

      `)

  });

}