/* ============= RENDER DEVEDORES ============= */
function renderDevedores(){

  const meses = [
    ...new Set(
      cobrancas
        .map(c => c[3])
        .filter(Boolean)
    )
  ].sort().reverse();

  tela.innerHTML = `
    
    <div class="box" style="margin-bottom:10px;">

      <b>Total em aberto</b><br>

      <span id="totalDivida">
        R$ 0.00
      </span>

    </div>

    <div class="linha-filtros">
      
      <input
        placeholder="Buscar devedor..."
        id="buscaDevedor"
      >

      <select id="filtroMesDevedor">

        <option value="">
          Todos
        </option>

        ${meses.map(m => `
          <option value="${m}">
            ${formatarMes(m)}
          </option>
        `).join("")}

      </select>

    </div>

    <div id="listaDevedores"></div>
  `;

  const busca =
    document.getElementById("buscaDevedor");

  const filtro =
    document.getElementById("filtroMesDevedor");

  if(busca){
    busca.oninput = listarDevedores;
  }

  if(filtro){
    filtro.onchange = listarDevedores;
  }

  listarDevedores();
}


/* ============= LISTAR DEVEDORES ============= */
function listarDevedores(){

  const busca =
    (
      document.getElementById("buscaDevedor")
        ?.value || ""
    ).toLowerCase();

  const mes =
    document.getElementById("filtroMesDevedor")
      ?.value || "";

  let lista = cobrancas.filter(c =>
    String(c[5]).trim() === "Pendente"
  );


/* ================== BUSCA ================== */
  if(busca){

    lista = lista.filter(c =>
      String(c[1] || "")
        .toLowerCase()
        .includes(busca)
    );

  }


/* ================ FILTRO MÊS ================ */
  if(mes){

    lista = lista.filter(c =>
      String(c[3]).trim() === mes
    );

  }


/* ================ ORDENAÇÃO ================ */
  lista.sort((a, b) => {

    const valorA = Number(a[4]) || 0;
    const valorB = Number(b[4]) || 0;

    return valorB - valorA;

  });

  let total = 0;
  let html = "";


/* =============== LISTA VAZIA =============== */
  if(!lista.length){

    html = `
      <div class="card">
        Nenhum devedor 🎉
      </div>
    `;

  }


/* ================== RENDER ================== */
  lista.forEach(c => {

    const nome = c[1];

    const mesFormatado = formatarMes(
      String(c[3] || "").substring(0,7)
    );

    const valor = Number(c[4]) || 0;

    total += valor;

    html += `

      <div class="card" style="
        display:flex;
        justify-content:space-between;
        align-items:center;
      ">
        
        <div>

          <div style="
            font-size:16px;
            font-weight:600;
          ">
            ${nome}
          </div>

          <div style="
            font-size:12px;
            color:#ef4444;
          ">
            ${mesFormatado} • Em aberto
          </div>

          <div style="margin-top:5px;">
            R$ ${valor.toFixed(2)}
          </div>

        </div>

        <button
          class="btn-light"
          style="
            font-size:12px;
            padding:6px 12px;
          "
          onclick="ir('cobrancas')"
        >
          Ver
        </button>

      </div>

    `;

  });


/* ================== TOTAL ================== */

  const totalEl =
    document.getElementById("totalDivida");

  if(totalEl){

    totalEl.innerText =
      "R$ " + total.toFixed(2);

  }

  document.getElementById("listaDevedores")
    .innerHTML = html;
}