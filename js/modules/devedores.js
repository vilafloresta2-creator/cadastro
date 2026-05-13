/* ================= RENDER DEVEDORES ================= */
function renderDevedores(){

  let meses = [...new Set(cobrancas.map(c => c[3]))];

    tela.innerHTML = `
      
      <div class="box" style="margin-bottom:10px;">
        <b>Total em aberto</b><br>
        <span id="totalDivida">R$ 0.00</span>
      </div>

      <div class="linha-filtros">
        
        <input placeholder="Buscar devedor..." id="buscaDevedor">

        <select id="filtroMesDevedor">
          <option value="">Todos</option>
          ${meses.map(m => `<option>${m}</option>`).join("")}
        </select>

      </div>

      <div id="listaDevedores"></div>
    `;

    const busca = document.getElementById("buscaDevedor");
    const filtro = document.getElementById("filtroMesDevedor");

    if(busca) busca.oninput = listarDevedores;
    if(filtro) filtro.onchange = listarDevedores;

    listarDevedores();
  }

/* ================= LISTAR DEVEDORES================= */
function listarDevedores(){

  const busca = (document.getElementById("buscaDevedor")?.value || "").toLowerCase();
  const mes = document.getElementById("filtroMesDevedor")?.value || "";

  let lista = cobrancas.filter(c => c[5] === "Pendente");

  if(busca){
    lista = lista.filter(c => String(c[1]).toLowerCase().includes(busca));
  }

  if(mes){
    lista = lista.filter(c => c[3] == mes);
  }

  let total = 0;
  let html = "";

  if(lista.length === 0){
    html = `<div class="card">Nenhum devedor 🎉</div>`;
  }

  lista.sort((a,b)=>b[4]-a[4]).forEach(c => {

    const nome = c[1];
    const mes = formatarMes(
      String(c[3]).substring(0,7)
    );
    const valor = Number(c[4]);

    total += valor;

    html += `
      <div class="card" style="display:flex;justify-content:space-between;align-items:center;">
        
        <div>
          <div style="font-size:16px;font-weight:600;">
            ${nome}
          </div>

          <div style="font-size:12px;color:#ef4444;">
            ${mes} • Em aberto
          </div>

          <div style="margin-top:5px;">
            R$ ${valor.toFixed(2)}
          </div>
        </div>

        <button class="btn-light" 
          style="font-size:12px;padding:6px 12px;"
          onclick="ir('cobrancas')">
          Ver
        </button>

      </div>
    `;
  });

  // 🔥 ATUALIZA TOTAL NO TOPO
  const totalEl = document.getElementById("totalDivida");
  if(totalEl){
    totalEl.innerText = "R$ " + total.toFixed(2);
  }

  document.getElementById("listaDevedores").innerHTML = html;
}