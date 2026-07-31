/* ----------------------------------------------
                RELATORIOS
---------------------------------------------- */

/* ============= RENDER RELATÓRIO ============= */
function renderRelatorios(){

  const mesAtual =
    obterMes(new Date());

  setHTML(
    "tela",
    `

      <div class="card">

        <h3>
          Relatório Financeiro
        </h3>

      </div>

      <div
        class="linha-filtros"
        style="margin-top:10px;"
      >

        <input
          id="mesRelatorio"
          value="${mesAtual}"
          maxlength="7"
        >

        ${renderButton({

          texto:"📊 Gerar Relatório",

          onclick:"gerarRelatorioMensal()"

        })}

      </div>

      <div id="resultadoRelatorio"></div>

    `
  );

  getEl("mesRelatorio")
    ?.addEventListener(

      "keydown",

      e=>{

        if(e.key==="Enter"){

          gerarRelatorioMensal();

        }

      }

    );

}


/* ============= GERAR RELATÓRIO ============= */
function gerarRelatorioMensal(){

  const mes =

    String(

      getValue(
        "mesRelatorio"
      )

    )

      .trim();

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

  safeArray(state.caixa)

    .map(caixaObj)

    .forEach(caixa=>{

      if(
        !dataValida(
          caixa.data
        )
      ){
        return;
      }

      if(
        obterMes(caixa.data)
        !==
        mes
      ){
        return;
      }

      const categoria =

        String(

          caixa.categoria
          ||
          "Sem categoria"

        ).trim();

      const valor =
        caixa.valor;

      const tipo =
        tipoCaixa(
          caixa.tipo
        );

      if(tipo==="Entrada"){

        entradas += valor;

      }

      if(tipo==="Saida"){

        saidas += valor;

        categorias[categoria] =

          (categorias[categoria] || 0)

          +

          valor;

      }

    });

  safeArray(state.cobrancas)

    .map(cobrancaObj)

    .forEach(c=>{

      if(

        obterMes(c.mes)
        !==
        mes

      ){
        return;
      }

      if(

        String(c.status)

          .trim()

          .toLowerCase()

        ===

        "pendente"

      ){

        inadimplencia +=
          c.valor;

      }

    });

  const saldo =
    entradas - saidas;

  const categoriasOrdenadas =

    Object.entries(categorias)

      .sort(

        (a,b)=>

          b[1]-a[1]

      );

  let htmlCategorias = "";

  if(!categoriasOrdenadas.length){

    htmlCategorias =

      renderListaVazia(
        "Nenhuma despesa encontrada."
      );

  }else{

    categoriasOrdenadas.forEach(

      ([categoria,valor])=>{

        htmlCategorias += `

          <div
            style="
              display:flex;
              justify-content:space-between;
              align-items:center;
              padding:8px 0;
              border-bottom:
                1px solid rgba(255,255,255,.06);
            "
          >

            <span>

              ${categoria}

            </span>

            <strong>

              ${moeda(valor)}

            </strong>

          </div>

        `;

      }

    );

  }

  setHTML(

    "resultadoRelatorio",

    `

      <div
        class="card"
        style="margin-top:15px;"
      >

        <h2>

          📅 Relatório ${mes}

        </h2>

        <hr>

        <div class="top">

          ${renderCardKPI({

            titulo:"Entradas",

            valor:
              moeda(entradas),

            classe:
              "text-success",

            onclick:`
              abrirDetalheRelatorio(
                'entradas',
                '${mes}'
              )
            `

          })}

          ${renderCardKPI({

            titulo:"Saídas",

            valor:
              moeda(saidas),

            classe:
              "text-danger",

            onclick:`
              abrirDetalheRelatorio(
                'saidas',
                '${mes}'
              )
            `

          })}

          ${renderCardKPI({

            titulo:"Saldo",

            valor:
              moeda(saldo),

            classe:

              saldo >= 0

                ? "text-success"

                : "text-danger"

          })}

          ${renderCardKPI({

            titulo:"Inadimplência",

            valor:
              moeda(inadimplencia),

            classe:
              "text-warning",

            onclick:`
              abrirDetalheRelatorio(
                'inadimplencia',
                '${mes}'
              )
            `

          })}

        </div>

        <hr
          style="
            margin-top:20px;
          "
        >

        <h3>

          📂 Despesas por Categoria

        </h3>

        ${htmlCategorias}

      </div>

    `

  );

}