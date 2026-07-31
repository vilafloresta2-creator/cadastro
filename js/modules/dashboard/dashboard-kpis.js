/* ----------------------------------------------
                  DASHBOARD KPIs
---------------------------------------------- */

/* ================= KPIs ================= */
function obterKPIsDashboard(){

  const mesAtual =
    obterMes(new Date());

  let entradas = 0;
  let saidas = 0;
  let inadimplencia = 0;
  let ativos = 0;

  /* ----------------------------
              CAIXA
  ---------------------------- */

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

  /* ----------------------------
            COBRANÇAS
  ---------------------------- */

  safeArray(state.cobrancas)
    .map(cobrancaObj)
    .forEach(c => {

      const status =

        normalizarTexto(c.status)
          .toLowerCase();

      const mesCobranca =
        formatarMes(c.mes);

      if(

        status === "pendente"
        &&

        mesCobranca === mesAtual

      ){

        inadimplencia +=
          c.valor;

      }

  });

  /* ----------------------------
          ASSOCIADOS
  ---------------------------- */

  safeArray(state.associados)
  .forEach(associado => {

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


/* ================= PROXIMAS RESERVAS ================= */
function obterProximasReservas(limite = 5){

  const hoje = new Date();

  return safeArray(state.reservas)

    .map(reservaObj)

    .filter(r => {

      const data = parseDataISO(r.data);

      if(!data){
        return false;
      }

      return data >= hoje;

    })

    .sort((a,b) => {

      const da =
        parseDataISO(a.data);

      const db =
        parseDataISO(b.data);

      return da - db;

    })

    .slice(0, limite);
}


/* ================= ALERTAS ================= */
function obterAlertasDashboard(){

  let cobrancasPendentes = 0;
  let reservasComSaldo = 0;
  let associadosInativos = 0;

  safeArray(state.cobrancas)

    .map(cobrancaObj)

    .forEach(c => {

      if(
        normalizarTexto(c.status)
          .toLowerCase()

        ===

        "pendente"
      ){
        cobrancasPendentes++;
      }

    });

  safeArray(state.reservas)

    .map(reservaObj)

    .forEach(r => {

      if(numero(r.saldo) > 0){
        reservasComSaldo++;
      }

    });

  safeArray(state.associados)

    .forEach(a => {

      if(

        normalizarTexto(
          a.status
        )

        .toLowerCase()

        ===

        "inativo"

      ){
        associadosInativos++;
      }

    });

  return {

    cobrancasPendentes,
    reservasComSaldo,
    associadosInativos

  };
}


/* ================= ÚLTIMOS LANÇAMENTOS ================= */
function obterUltimosLancamentos(
  limite = 5
){

  return safeArray(state.caixa)

    .slice()

    .reverse()

    .slice(0, limite)

    .map(item =>
      caixaObj(item)
    );
}