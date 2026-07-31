/* ----------------------------------------------
                  UI
---------------------------------------------- */


/* =========================================
                CARD
========================================= */

/*
  Card genérico simples.

  OBS:
  O card padrão do sistema continua sendo
  renderCardPadrao(), localizado em card.js.

  Este aqui é mantido apenas para componentes
  simples que precisem de um container .card.
*/
function renderCard(conteudo = ""){

  return `

    <div class="card">

      ${conteudo}

    </div>

  `;

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

  icone = "",

  type = "button",

  disabled = false

} = {}){

  return `

    <button

      type="${type}"

      class="${classe}"

      onclick="${onclick}"

      ${disabled ? "disabled" : ""}

    >

      ${icone
        ? `${icone} `
        : ""
      }

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

} = {}){

  return `

    <span
      class="status-badge status-${tipo}"
    >

      ${texto}

    </span>

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


/* =========================================
            INFO VALOR
========================================= */

function renderInfoValor(

  label = "",

  valor = "",

  classe = ""

){

  return `

    <div class="info-valor">

      <small>

        ${label}

      </small>

      <strong class="${classe}">

        ${valor}

      </strong>

    </div>

  `;

}