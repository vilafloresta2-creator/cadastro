/* ================= RENDER ================= */
function render(){

  if(telaAtual === "dashboard") renderDashboard();
  if(telaAtual === "caixa") renderCaixa();
  if(telaAtual === "cobrancas") renderCobrancas();
  if(telaAtual === "associados") renderAssociados();
  if(telaAtual === "devedores") renderDevedores();
  if(telaAtual === "backups") renderBackups();
  if(telaAtual === "fixas") renderFixas();
  if(telaAtual === "relatorios") renderRelatorios();
  /*if(telaAtual === "recibos") renderRecibos();*/
}

/* ================= RENDER DASHBOARD ================= */
function renderDashboard(){

  const hoje = new Date();

  const mesAtual =
    String(hoje.getMonth()+1).padStart(2,"0")
    + "-"
    + hoje.getFullYear();

  let entradas = 0;
  let saidas = 0;
  let inadimplencia = 0;
  let ativos = 0;

  // CAIXA
  caixa.forEach(c => {

    let mes = "";

    if(c[1]){

      const d = new Date(c[1]);

      mes =
        String(d.getMonth()+1).padStart(2,"0")
        + "-"
        + d.getFullYear();
    }

    if(mes !== mesAtual){
      return;
    }

    const tipo =
      String(c[2]).trim();

    const valor =
      Number(c[5]) || 0;

    if(tipo === "Entrada"){
      entradas += valor;
    }

    if(
      tipo === "Saída"
      || tipo === "Saida"
    ){
      saidas += valor;
    }

  });

  // INADIMPLÊNCIA
  cobrancas.forEach(c => {

    if(String(c[5]).trim() === "Pendente"){
      inadimplencia += Number(c[4]) || 0;
    }

  });

  // ASSOCIADOS ATIVOS
  associados.forEach(a => {

    const status =
      String(a[7] || "Ativo").trim();

    if(status === "Ativo"){
      ativos++;
    }

  });

  const saldo = entradas - saidas;

  tela.innerHTML = `

    <div class="top">

      <div class="box">
        <b>Entradas</b><br>
        <span style="color:#22c55e;">
          R$ ${entradas.toFixed(2)}
        </span>
      </div>

      <div class="box">
        <b>Saídas</b><br>
        <span style="color:#ef4444;">
          R$ ${saidas.toFixed(2)}
        </span>
      </div>

      <div class="box">
        <b>Saldo</b><br>
        <span>
          R$ ${saldo.toFixed(2)}
        </span>
      </div>

      <div class="box">
        <b>Inadimplência</b><br>
        <span style="color:#f59e0b;">
          R$ ${inadimplencia.toFixed(2)}
        </span>
      </div>

      <div class="box">
        <b>Associados Ativos</b><br>
        <span>
          ${ativos}
        </span>
      </div>

    </div>

  `;
}

/* ================= RENDER CAIXA ================= */
function renderCaixa(){

  tela.innerHTML = `

    <div class="top">

      <div class="box">
        <b>Entradas</b><br>
        <span id="totalEntradas">R$ 0.00</span>
      </div>

      <div class="box">
        <b>Saídas</b><br>
        <span id="totalSaidas">R$ 0.00</span>
      </div>

      <div class="box">
        <b>Saldo</b><br>
        <span id="saldoFinal">R$ 0.00</span>
      </div>

    </div>

    <div class="card" style="margin-top:15px;">

      <div style="display:flex;gap:10px;flex-wrap:wrap;">

        <select id="cx_tipo" style="flex:1;min-width:150px;">
          <option value="Entrada">Entrada</option>
          <option value="Saida">Saída</option>
        </select>

        <input id="cx_categoria" placeholder="Categoria" style="flex:1;min-width:180px;">

      </div>

      <div style="display:flex;gap:10px;margin-top:10px;flex-wrap:wrap;">

        <input id="cx_descricao" placeholder="Descrição" style="flex:2;min-width:220px;">

        <input id="cx_valor" type="number" step="0.01" placeholder="Valor" style="flex:1;min-width:120px;">

      </div>

      <button class="btn" style="margin-top:12px;" onclick="salvarCaixa()">
        💾 Lançar
      </button>

      <button class="btn" style="margin-top:10px;" onclick="fecharMes()">
        💰 Fechar Mês
      </button>

    </div>

    <div id="listaCaixa"></div>

  `;

  listarCaixa();
}

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
      ${gerado ? "disabled style='opacity:0.5'" : ""}>
      ${gerado ? "✔ Já gerado" : "⚡ Gerar"}
    </button>
  </div>

  <div id="lista"></div>
`;

  document.getElementById("filtroMes").onchange = listar;
  listar();
}

/* ================= RENDER ASSOCIADOS ================= */
function renderAssociados(){

  tela.innerHTML = `
    <div style="display:flex; gap:10px; margin-bottom:10px;">
      <input placeholder="Buscar..." id="busca" style="flex:1;">      
      <!-- <button class="btn" onclick="alterarMensalidadeTodos()">💰 Atualizar Mensalidade</button> -->
      <button class="btn" onclick="abrirModalMensalidade()">💰 Alterar Mensalidade</button>
    </div>
    <div id="lista"></div>
  `;

  document.getElementById("busca").oninput = listarAssociados;

  listarAssociados();
}

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

/* ================= RENDER BACKUPs ================= */
function renderBackups(){

  tela.innerHTML = `
    <button class="btn" onclick="fazerBackup(event)">
      💾 Fazer Backup
    </button>

    <div id="listaBackups" style="margin-top:10px;"></div>
  `;

  listarBackups();
}

/* ================= RENDER DESPESAS FIXAS ================= */
function renderFixas(){

  tela.innerHTML = `

    <div class="card">

      <h3>Nova Despesa Fixa</h3>

      <input id="fx_categoria" placeholder="Categoria">

      <input id="fx_descricao" placeholder="Descrição"
        style="margin-top:8px;">

      <input id="fx_valor" type="number"
        placeholder="Valor"
        style="margin-top:8px;">

      <input id="fx_dia" type="number"
        placeholder="Dia do mês"
        style="margin-top:8px;">

      <button class="btn"
        style="margin-top:10px;"
        onclick="salvarFixa()">

        Salvar
      </button>

    </div>

    <div id="listaFixas"></div>
  `;

  listarFixas();
}

/* ================= RENDER RELATORIOS ================= */
function renderRelatorios(){

  tela.innerHTML = `

    <div class="card">

      <h3>Relatório Financeiro</h3>

      <input
        id="mesRelatorio"
        placeholder="MM-YYYY"
      >

      <button
        class="btn"
        style="margin-top:10px;"
        onclick="gerarRelatorioMensal()">

        Gerar Relatório

      </button>

    </div>

    <div id="resultadoRelatorio"></div>

  `;
}

/* ================= RENDER RECIBOS ================= */
function renderRecibos(){

  // 🔒 garante que recibos existe
  if(!Array.isArray(recibos)){
    recibos = [];
  }

  tela.innerHTML = `
  <div class="filtro-linha" style="display:flex; gap:10px; margin-bottom:10px;">
    <input placeholder="Buscar..." style="flex:1;">
    <select style="width:200px;">
      <option>Todos</option>
    </select>
  </div>
  <div id="listaRecibos"></div>
  `;

  // 🔒 protege contra null
  const busca = document.getElementById("buscaRecibo");
  if(busca){
    busca.oninput = listarRecibos;
  }

  listarRecibos();
}