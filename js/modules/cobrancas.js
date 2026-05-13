/* ================= RENDER COBRANÇAS ================= */
function renderCobrancas(){

  let meses = [...new Set(cobrancas.map(c=>c[3]))];

  const hoje = new Date();
  const mes = String(hoje.getMonth()+1).padStart(2,"0") + "-" + hoje.getFullYear();

  const gerado = jaGerouMesAtual();

  tela.innerHTML = `
  <div style="margin-bottom:10px;">
    <p style="font-size:12px; opacity:0.7;">
      Referente a ${mes}
    </p>
  </div>

  <div class="acoes">
    <select id="filtroMes" style="flex:1;">
      <option value="">Todos</option>
      ${meses.map(m=>`<option>${m}</option>`).join("")}
    </select>

    <button class="btn" onclick="gerarCobrancas()" 
      ${gerado ? "disabled" : ""}
      style="${gerado ? "opacity:.5;cursor:not-allowed;" : ""}">
      ${gerado ? "✔ Já gerado" : "⚡ Gerar"}
    </button>
  </div>

  <div id="lista"></div>
`;

  document.getElementById("filtroMes").onchange = listar;
  listar();
}

/* ================= LISTAR ================= */
function listar(){

  const mes = document.getElementById("filtroMes")?.value || "";

  let lista = cobrancas;

  if(mes){
    lista = lista.filter(c=>c[3]==mes);
  }

  let html = "";

  lista.forEach(c=>{

    html += `
      <div class="card">
        <b>${c[1]}</b><br>
        ${formatarMes(c[3])}<br>
        <b>${c[5]}</b><br>

        ${c[5]=="Pendente" ? 
          `<button class="btn-light" onclick="pagar('${c[0]}')">Pagar</button>` 
        : ""}

        ${c[5]=="Pago" ? `
          <button class="btn-recibo"
            style="margin-top:8px;"
            onclick="reimprimir('${c[7] || ""}')">
            🧾 Reimprimir
          </button>
        ` : ""}
      </div>
    `;
  });

  document.getElementById("lista").innerHTML = html;
}