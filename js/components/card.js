/* ----------------------------------------
          CARD PADRÃO
---------------------------------------- */

function renderCardPadrao({

  titulo = "",
  subtitulo = "",
  detalhe = "",
  info = "",
  onclick = "",
  botao = "",
  classe = ""

}){

  return `

    <div
      class="card ${classe}"
      ${onclick ? `onclick="${onclick}"` : ""}
      style="
        cursor:${onclick ? "pointer" : "default"};
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:10px;
      "
    >

      <div>

        <div style="
          font-size:16px;
          font-weight:600;
        ">

          ${titulo}

        </div>

        ${
          subtitulo
            ? `
              <div style="
                font-size:13px;
                opacity:.8;
                margin-top:4px;
              ">
                ${subtitulo}
              </div>
            `
            : ""
        }

        ${
          detalhe
            ? `
              <div style="
                font-size:12px;
                opacity:.7;
                margin-top:6px;
              ">
                ${detalhe}
              </div>
            `
            : ""
        }

      </div>

      <div style="
        display:flex;
        align-items:center;
        gap:16px;
      ">

        ${info || ""}

        ${botao || ""}

      </div>

    </div>

  `;

}