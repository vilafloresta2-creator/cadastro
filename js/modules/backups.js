/* =========================================
   BACKUPS
========================================= */


/* ============== RENDER BACKUPS ============== */
function renderBackups(){

  tela.innerHTML = `

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

  `;

  listarBackups();
}


/* ============== LISTAR BACKUPS ============== */
function listarBackups(){

  const lista =
    document.getElementById(
      "listaBackups"
    );

  if(!lista){
    return;
  }

  const listaBackups =
    safeArray(state.backups);

  /* ============== LISTA VAZIA ============== */
  if(!listaBackups.length){

    lista.innerHTML = `

      <div class="card">

        Nenhum backup encontrado.

      </div>

    `;

    return;
  }

  let html = "";


  /* ================== LISTA ================== */
  listaBackups
    .slice()
    .reverse()
    .forEach(b => {

      if(!b || !b.length){
        return;
      }

      const data =
        formatarData(b[0]);

      const nome =

        String(b[1] || "")
          .trim();

      const link =

        String(b[2] || "")
          .trim();

      html += `

        <div
          class="card"
          style="
            display:flex;
            justify-content:space-between;
            align-items:center;
            gap:10px;
            flex-wrap:wrap;
          "
        >

          <div>

            <div style="
              font-size:16px;
              font-weight:600;
            ">

              ${nome || "Backup"}

            </div>

            <div style="
              font-size:12px;
              opacity:.7;
              margin-top:4px;
            ">

              ${data}

            </div>

          </div>

          <div style="
            display:flex;
            gap:6px;
            flex-wrap:wrap;
          ">

            <button
              class="btn"
              onclick="abrirBackup('${link}')"
            >

              Abrir

            </button>

            <button
              class="btn-light"
              onclick="restaurarBackup('${link}')"
            >

              Restaurar

            </button>

          </div>

        </div>

      `;
    });

  lista.innerHTML = html;
}


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
function fazerBackup(ev){

  const btn =
    ev?.target;

  if(btn){

    btn.innerText =
      "Salvando...";

    btn.disabled = true;
  }

  showLoading(
    "Gerando backup..."
  );

  try{

    const resp = await postAPI({
      acao:"backup"
    });

    if(resp.erro){

      showToast(
        resp.erro,
        "error"
      );

      return;
    }

    await carregar();

    showToast(
      "Backup criado com sucesso!"
    );

    const abrir =
      await showConfirm(
        "Deseja abrir o backup agora?"
      );

    if(
      abrir
      &&
      resp.url
    ){

      abrirBackup(
        resp.url
      );
    }

  }catch(error){

    console.error(
      "BACKUP ERROR:",
      error
    );

    showToast(
      "Erro ao gerar backup",
      "error"
    );

  }finally{

    hideLoading();

    if(btn){

      btn.innerText =
        "💾 Fazer Backup";

      btn.disabled = false;
    }
  }
}


/* ============= RESTAURAR BACKUP ============= */
function restaurarBackup(url){

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

  showLoading(
    "Restaurando backup..."
  );

  try{

    const resp = await postAPI({

      acao:"restore",
      url

    });

    if(resp.erro){

      showToast(
        resp.erro,
        "error"
      );

      return;
    }

    showToast(
      "Backup restaurado!"
    );

    await carregar();

  }catch(error){

    console.error(
      "RESTORE ERROR:",
      error
    );

    showToast(
      "Erro ao restaurar backup",
      "error"
    );

  }finally{

    hideLoading();
  }
}