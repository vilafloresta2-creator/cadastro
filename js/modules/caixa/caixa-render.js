/* ----------------------------------------------
                  CAIXA RENDER
---------------------------------------------- */

/* =============== RENDER CAIXA =============== */
function renderCaixa(){

  const kpi =
    obterKPIsDashboard();

  const mesAtual =
    obterMes(new Date());  

  setHTML(
  "tela", `

    <div class="top">

      ${renderCardKPI({

        titulo:"Entradas",

        valor:
          moeda(kpi.entradas),

        classe:
          "text-success",

        onclick:
          `abrirRelatorioCaixa(
            '${mesAtual}',
            'entrada'
         )`

      })}      

      ${renderCardKPI({

        titulo:"Saídas",

        valor:
          moeda(kpi.saidas),

        classe:
          "text-danger",

        onclick:
          `abrirRelatorioCaixa(
            '${mesAtual}',
            'saida'
         )`

      })}

      ${renderCardKPI({

        titulo:"Saldo",

        valor:
          moeda(kpi.saldo),

        classe:
          kpi.saldo >= 0
            ? "text-success"
            : "text-danger"

      })}

    </div> 


    <div class="linha-filtros">    

      <input
        id="buscaCaixa"
        placeholder="Buscar lançamento..."
      >
      
      ${renderButton({

        texto:"💰 Fechar Mês",

        onclick:"fecharMes()"

      })}

    </div> 

    <div id="listaCaixa"></div>

    <button
      class="fab"
      onclick="abrirCaixaModal()"
    >
      +
    </button>            
    
  `);

  const busca =
    getEl("buscaCaixa");

  if(busca){

    busca.oninput =
      listarCaixa;
  }  

  listarCaixa();
}


/* ========== FILTRAR CAIXA ========== */
function obterCaixaFiltrado(){

  const busca =

    normalizarTexto(
      getValue("buscaCaixa")
    )

      .toLowerCase();

  return safeArray(state.caixa)

    .filter(Boolean)

    .filter(item => {

      const caixa =
        caixaObj(item);

      return (

        normalizarTexto(
          caixa.descricao
        )

          .toLowerCase()

          .includes(busca)

        ||

        normalizarTexto(
          caixa.categoria
        )

          .toLowerCase()

          .includes(busca)

        ||

        normalizarTexto(
          caixa.tipo
        )

          .toLowerCase()

          .includes(busca)

        ||

        String(
          caixa.valor || ""
        )

          .includes(busca)

      );

    });

}


/* =============== LISTAR CAIXA =============== */
function listarCaixa(){

  const listaEl =
    getEl("listaCaixa");

  if(!listaEl){
    return;
  }

  const lista =
    obterCaixaFiltrado();

  if(!lista.length){

    setHTML(
      "listaCaixa",
      renderListaVazia(
        "Nenhum lançamento encontrado."
      )
    );

    return;
  }

  const html =

    lista
      .slice()
      .reverse()
      .map(renderCaixaCard)
      .join("");

  setHTML(
    "listaCaixa",
    html
  );

}


/* ========== ATUALIZAR RESUMO ========== 
function atualizarResumoCaixa(
  entradas = 0,
  saidas = 0
){

  const saldo =
    entradas - saidas;

  const entradasEl =
    document.getElementById(
      "totalEntradas"
    );

  const saidasEl =
    document.getElementById(
      "totalSaidas"
    );

  const saldoEl =
    document.getElementById(
      "saldoFinal"
    );

  if(entradasEl){
    entradasEl.innerText =
      moeda(entradas);
  }

  if(saidasEl){
    saidasEl.innerText =
      moeda(saidas);
  }

  if(saldoEl){

    saldoEl.innerText =
      moeda(saldo);

    saldoEl.style.color =
      saldo >= 0
        ? "#22c55e"
        : "#ef4444";
  }
}*/


/* =============== RENDER CAIXA CARD =============== */
function renderCaixaCard(item){

  const caixa =
    caixaObj(item);

  return renderCardPadrao({

    classe: "caixa-card",

    titulo:
      caixa.descricao || "-",

    subtitulo:
      caixa.categoria || "-",

     info: renderInfoValor(

          "Valor",

          moeda(caixa.valor),

          corTipoCaixa(caixa.tipo)

      ),

    onclick:
      `editarCaixa('${caixa.id}')`,

    botao: renderButton({

      texto:"🗑️",

      classe:"btn-cancelar btn-icon",

      onclick:`
        event.stopPropagation();
        excluirCaixaAPI('${caixa.id}');
      `

    })

  });

}