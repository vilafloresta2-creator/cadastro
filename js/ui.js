/* =========================================
   UI
========================================= */


/* =========================================
   CARD
========================================= */

function renderCard(conteudo = ""){

  return `

    <div class="card">

      ${conteudo}

    </div>

  `;
}


/* =========================================
   EMPTY
========================================= */

function renderEmpty(
  texto = "Nenhum registro encontrado."
){

  return renderCard(`

    <div class="empty-state">

      ${texto}

    </div>

  `);
}


/* =========================================
   SECTION TITLE
========================================= */

function renderSectionTitle(
  titulo = ""
){

  return `

    <div class="section-title">

      ${titulo}

    </div>

  `;
}


/* =========================================
   BUTTON
========================================= */

function renderButton({
  texto = "Botão",
  classe = "btn",
  onclick = "",
  icone = ""
}){

  return `

    <button
      class="${classe}"
      onclick="${onclick}"
    >

      ${icone ? icone + " " : ""}

      ${texto}

    </button>

  `;
}


/* =========================================
   STATUS
========================================= */

function renderStatus({
  texto = "",
  tipo = "success"
}){

  return `

    <span
      class="status-badge status-${tipo}"
    >

      ${texto}

    </span>

  `;
}


/* =========================================
   GRID 2
========================================= */

function renderGrid2(
  conteudo = ""
){

  return `

    <div class="grid-2">

      ${conteudo}

    </div>

  `;
}


/* =========================================
   ACTIONS
========================================= */

function renderActions(
  conteudo = ""
){

  return `

    <div class="acoes-lista">

      ${conteudo}

    </div>

  `;
}