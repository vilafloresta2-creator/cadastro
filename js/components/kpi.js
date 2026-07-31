/* ----------------------------------------------
                  KPI
---------------------------------------------- */

function renderCardKPI({

  titulo="",
  valor="",
  classe="",
  onclick=""

}){

  return `

    <div
      class="box"
      style="
        cursor:${onclick ? "pointer" : "default"};
      "
      ${onclick ? `onclick="${onclick}"` : ""}
    >

      <b>${titulo}</b>

      <br>

      <span class="${classe}">
        ${valor}
      </span>

    </div>

  `;
}