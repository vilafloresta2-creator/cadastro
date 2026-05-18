/* =========================================
   DASHBOARD
========================================= */


/* ============= RENDER DASHBOARD ============= */
function renderDashboard(){

  const mesAtual =
    obterMes(new Date());

  let entradas = 0;
  let saidas = 0;
  let inadimplencia = 0;
  let ativos = 0;

  const listaCaixa =
    safeArray(state.caixa);

  const listaCobrancas =
    safeArray(state.cobrancas);

  const listaAssociados =
    safeArray(state.associados);

  /* =========================================
     CAIXA
  ========================================= */

  listaCaixa.forEach(c => {

    if(!c || !c.length){
      return;
    }

    const data =
      c[1];

    if(!dataValida(data)){
      return;
    }

    const mes =
      obterMes(data);

    /* ===== apenas mês atual ===== */
    if(mes !== mesAtual){
      return;
    }

    const tipo =
      normalizarTexto(c[2])
        .toLowerCase();

    const valor =
      numero(c[5]);

    if(tipo === "entrada"){
      entradas += valor;
    }

    if(tipo === "saida"){
      saidas += valor;
    }

  });

  /* =========================================
     INADIMPLÊNCIA
  ========================================= */

  listaCobrancas.forEach(c => {

    if(!c || !c.length){
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
     ASSOCIADOS ATIVOS
  ========================================= */

  listaAssociados.forEach(a => {

    if(!a || !a.length){
      return;
    }

    const status =

      normalizarTexto(
        a[7] || "Ativo"
      )

      .toLowerCase();

    if(status === "ativo"){
      ativos++;
    }

  });

  const saldo =
    entradas - saidas;

  /* =========================================
     RENDER
  ========================================= */

  tela.innerHTML = `

    <div class="top">

      <div class="box">

        <b>Entradas</b><br>

        <span class="text-success">
          ${moeda(entradas)}
        </span>

      </div>

      <div class="box">

        <b>Saídas</b><br>

        <span class="text-danger">
          ${moeda(saidas)}
        </span>

      </div>

      <div class="box">

        <b>Saldo</b><br>

        <span
          class="${
            saldo >= 0
              ? "text-success"
              : "text-danger"
          }"
        >

          ${moeda(saldo)}

        </span>

      </div>

      <div class="box">

        <b>Inadimplência</b><br>

        <span class="text-warning">
          ${moeda(inadimplencia)}
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