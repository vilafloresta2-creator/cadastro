/* ============= RENDER RELATORIO ============= */
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

        📊 Gerar Relatório

      </button>

    </div>

    <div id="resultadoRelatorio"></div>

  `;
}


/* ============= GERAR RELATORIO ============= */
function gerarRelatorioMensal(){

  const mes =
    document.getElementById("mesRelatorio")
      .value
      .trim();

  if(!mes){

    alert("Informe o mês");
    return;
  }

  let entradas = 0;
  let saidas = 0;
  let inadimplencia = 0;

  const categorias = {};


/* ================== CAIXA ================== */
  caixa.forEach(c => {

    if(!c[1]) return;

    const d = new Date(c[1]);

    if(isNaN(d)) return;

    const mesLinha =
      String(d.getMonth()+1).padStart(2,"0")
      + "-"
      + d.getFullYear();

    if(mesLinha !== mes){
      return;
    }

    const tipo =
      String(c[2] || "").trim();

    const categoria =
      String(c[3] || "Sem categoria").trim();

    const valor =
      Number(c[5]) || 0;

    /* ENTRADAS */
    if(tipo === "Entrada"){
      entradas += valor;
    }

    /* SAIDAS */
    if(
      tipo === "Saída" ||
      tipo === "Saida"
    ){

      saidas += valor;

      if(!categorias[categoria]){
        categorias[categoria] = 0;
      }

      categorias[categoria] += valor;
    }

  });


/* ============== INADIMPLENCIA ============== */
  cobrancas.forEach(c => {

    const mesCobranca =
      formatarMes(
        String(c[3]).substring(0,7)
      );

    if(
      mesCobranca === mes &&
      String(c[5]).trim() === "Pendente"
    ){

      inadimplencia += Number(c[4]) || 0;
    }

  });

  const saldo = entradas - saidas;


/* ============ ORDENAR CATEGORIAS ============ */
  const categoriasOrdenadas =
    Object.entries(categorias)
      .sort((a,b) => b[1] - a[1]);

  let htmlCategorias = "";

  if(!categoriasOrdenadas.length){

    htmlCategorias = `
      <div style="margin-top:10px;opacity:0.7;">
        Nenhuma despesa encontrada.
      </div>
    `;
  }

  categoriasOrdenadas.forEach(([cat, valor]) => {

    htmlCategorias += `

      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-top:8px;
        padding:8px 0;
        border-bottom:1px solid rgba(255,255,255,.06);
      ">

        <span>${cat}</span>

        <b>
          R$ ${valor.toFixed(2)}
        </b>

      </div>

    `;
  });
  

/* ================== RENDER ================== */
  document.getElementById("resultadoRelatorio")
    .innerHTML = `

    <div class="card" style="margin-top:15px;">

      <h2>
        📅 Relatório ${mes}
      </h2>

      <hr>

      <div style="
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
        gap:10px;
        margin-top:15px;
      ">

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

          <b>Saldo Final</b><br>

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

      </div>

      <hr style="margin-top:20px;">

      <h3>
        📂 Despesas por Categoria
      </h3>

      ${htmlCategorias}

    </div>

  `;
}