/* =========================================
   DASHBOARD
========================================= */


/* ================= KPIs ================= */
function obterKPIsDashboard(){

  const mesAtual =
    obterMes(new Date());

  let entradas = 0;
  let saidas = 0;
  let inadimplencia = 0;
  let ativos = 0;

  /* =========================================
   CAIXA
========================================= */

safeArray(state.caixa)
  .forEach(c => {

    const caixa =
      caixaObj(c);

    const data =
      caixa.data;

    if(!dataValida(data)){
      return;
    }

    const mes =
      obterMes(data);

    if(mes !== mesAtual){
      return;
    }

    const tipo =

      normalizarTexto(
        caixa.tipo
      )

      .toLowerCase();

    const valor =
      caixa.valor;

    if(tipo === "entrada"){
      entradas += valor;
    }

    if(tipo === "saida"){
      saidas += valor;
    }

  });

  /* =========================================
     COBRANÇAS
  ========================================= */

  safeArray(state.cobrancas)
    .forEach(c => {

      if(!c?.length){
        return;
      }

      const status =

        normalizarTexto(c[5])
          .toLowerCase();

      const mesCobranca =
        formatarMes(c[3]);

      if(

        status === "pendente"
        &&

        mesCobranca === mesAtual

      ){

        inadimplencia +=
          numero(c[4]);
      }

    });

  /* =========================================
     ASSOCIADOS
  ========================================= */

  safeArray(state.associados)
    .forEach(item => {

      const associado = item;

      if(
        normalizarTexto(
          associado.status
        )

        .toLowerCase()

        ===

        "ativo"
      ){
        ativos++;
      }

    });

  return {

    entradas,
    saidas,

    saldo:
      entradas - saidas,

    inadimplencia,

    ativos

  };
}


/* ================= CARD KPI ================= */
function cardKPI({
  titulo = "",
  valor = "",
  classe = ""
}){

  return `

    <div class="box">

      <b>
        ${titulo}
      </b>

      <br>

      <span class="${classe}">
        ${valor}
      </span>

    </div>

  `;
}


/* ================= RENDER ================= */
function renderDashboard(){

  const kpi =
    obterKPIsDashboard();

  tela.innerHTML = `

    <div class="top">

      ${cardKPI({

        titulo:"Entradas",

        valor:
          moeda(kpi.entradas),

        classe:
          "text-success"

      })}

      ${cardKPI({

        titulo:"Saídas",

        valor:
          moeda(kpi.saidas),

        classe:
          "text-danger"

      })}

      ${cardKPI({

        titulo:"Saldo",

        valor:
          moeda(kpi.saldo),

        classe:
          kpi.saldo >= 0
            ? "text-success"
            : "text-danger"

      })}

      ${cardKPI({

        titulo:"Inadimplência",

        valor:
          moeda(kpi.inadimplencia),

        classe:
          "text-warning"

      })}

      ${cardKPI({

        titulo:"Associados Ativos",

        valor:
          kpi.ativos

      })}

    </div>

  `;
}