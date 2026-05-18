/* =========================================
   RELATORIOS
========================================= */


/* ============= RENDER RELATÓRIO ============= */
function renderRelatorios(){

  tela.innerHTML = `

    <div class="card">

      <h3>Relatório Financeiro</h3>

      <input
        id="mesRelatorio"
        placeholder="MM-YYYY"
        maxlength="7"
      >

      <button
        class="btn"
        style="margin-top:10px;"
        onclick="gerarRelatorioMensal()"
      >

        📊 Gerar Relatório

      </button>

    </div>

    <div id="resultadoRelatorio"></div>

  `;

  const input =
    document.getElementById(
      "mesRelatorio"
    );

  if(input){

    input.addEventListener(
      "keydown",
      e => {

        if(e.key === "Enter"){
          gerarRelatorioMensal();
        }

      }
    );
  }
}


/* ============= GERAR RELATÓRIO ============= */
function gerarRelatorioMensal(){

  const mes =

    String(

      document.getElementById(
        "mesRelatorio"
      )?.value || ""

    )

      .trim();

  /* ================= VALIDAÇÃO ================= */
  if(!mes){

    showToast(
      "Informe o mês",
      "warning"
    );

    return;
  }

  if(
    !/^\d{2}-\d{4}$/.test(mes)
  ){

    showToast(
      "Formato inválido. Use MM-YYYY",
      "warning"
    );

    return;
  }

  let entradas = 0;
  let saidas = 0;
  let inadimplencia = 0;

  const categorias = {};

  const listaCaixa =
    safeArray(state.caixa);

  const listaCobrancas =
    safeArray(state.cobrancas);


  /* ================== CAIXA ================== */
  listaCaixa.forEach(c => {

    if(!c || !c.length){
      return;
    }

    const data =
      c[1];

    if(!dataValida(data)){
      return;
    }

    const mesLinha =
      obterMes(data);

    if(mesLinha !== mes){
      return;
    }

    const tipo =
      normalizarTexto(c[2]);

    const categoria =

      String(
        c[3] || "Sem categoria"
      )

        .trim();

    const valor =
      numero(c[5]);

    /* =============== ENTRADAS =============== */
    if(isEntrada(tipo)){
      entradas += valor;
    }

    /* ================= SAÍDAS ================= */
    if(isSaida(tipo)){

      saidas += valor;

      if(!categorias[categoria]){
        categorias[categoria] = 0;
      }

      categorias[categoria] += valor;
    }

  });


  /* ============== INADIMPLÊNCIA ============== */
  listaCobrancas.forEach(c => {

    if(!c || !c.length){
      return;
    }

    const mesCobranca =

      String(c[3] || "")
        .replace("/", "-")
        .trim();

    const status =
      normalizarTexto(c[5]);

    if(
      mesCobranca === mes
      &&
      status === "Pendente"
    ){

      inadimplencia +=
        numero(c[4]);
    }

  });

  const saldo =
    entradas - saidas;


  /* ============ ORDENAR CATEGORIAS ============ */
  const categoriasOrdenadas =

    Object.entries(categorias)

      .sort((a, b) =>

        b[1] - a[1]

      );

  let htmlCategorias = "";


  /* ============== SEM DESPESAS ============== */
  if(!categoriasOrdenadas.length){

    htmlCategorias = `

      <div style="
        margin-top:10px;
        opacity:.7;
      ">

        Nenhuma despesa encontrada.

      </div>

    `;
  }


  /* ================== LISTA ================== */
  categoriasOrdenadas.forEach(([categoria, valor]) => {

    htmlCategorias += `

      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-top:8px;
        padding:8px 0;
        border-bottom:
          1px solid rgba(255,255,255,.06);
      ">

        <span>
          ${categoria}
        </span>

        <b>
          ${moeda(valor)}
        </b>

      </div>

    `;
  });


  /* ================== RENDER ================== */
  document.getElementById(
    "resultadoRelatorio"
  ).innerHTML = `

    <div
      class="card"
      style="margin-top:15px;"
    >

      <h2>
        📅 Relatório ${mes}
      </h2>

      <hr>

      <div style="
        display:grid;
        grid-template-columns:
          repeat(auto-fit,minmax(180px,1fr));
        gap:10px;
        margin-top:15px;
      ">

        <div class="box">

          <b>Entradas</b><br>

          <span style="color:#22c55e;">

            ${moeda(entradas)}

          </span>

        </div>

        <div class="box">

          <b>Saídas</b><br>

          <span style="color:#ef4444;">

            ${moeda(saidas)}

          </span>

        </div>

        <div class="box">

          <b>Saldo Final</b><br>

          <span style="
            color:
              ${
                saldo >= 0
                  ? "#22c55e"
                  : "#ef4444"
              };
          ">

            ${moeda(saldo)}

          </span>

        </div>

        <div class="box">

          <b>Inadimplência</b><br>

          <span style="color:#f59e0b;">

            ${moeda(inadimplencia)}

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