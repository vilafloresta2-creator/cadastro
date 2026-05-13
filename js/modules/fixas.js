/* ================= LISTA DESPESAS FIXAS ================= */
function listarFixas(){

  let html = "";

  fixas.forEach(f => {

    html += `
      <div class="card"
        style="display:flex;
        justify-content:space-between;
        align-items:center;">

        <div>
          <b>${f[1]}</b><br>

          ${f[2]}<br>

          Dia ${f[4]}<br>

          R$ ${Number(f[3]).toFixed(2)}
        </div>

      </div>
    `;
  });

  document.getElementById("listaFixas")
    .innerHTML = html;
}