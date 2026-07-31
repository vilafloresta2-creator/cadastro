/* ----------------------------------------------
                RELATORIOS MODAL
---------------------------------------------- */

function abrirRelatorioLista(
  titulo,
  htmlCards
){

  abrirModalPrincipal(`

    <div
      class="modal-box"
      onclick="event.stopPropagation()"
    >

      <h3>
        ${titulo}
      </h3>

      ${htmlCards}

    </div>

  `);
}


/* =================================================== */
function abrirRelatorioCaixa(
  mes,
  tipo
){  

  let html = "";

  safeArray(state.caixa)

    .forEach(item => {      

      const caixa =
        caixaObj(item);

      if(
        obterMes(caixa.data)
        !==
        mes
      ){
        return;
      }

      const tipoNormalizado =
        tipoCaixa(caixa.tipo);

      if(
        tipo === "entrada"
        &&
        tipoNormalizado !== "Entrada"
      ){
        return;
      }

      if(
        tipo === "saida"
        &&
        tipoNormalizado !== "Saida"
      ){
        return;
      }

      html += `

        <div class="card">

          <b>
            ${caixa.descricao}
          </b>

          <br>

          ${caixa.categoria}

          <div
            style="
              margin-top:6px;
              font-weight:bold;
              color:${
                tipo === "entrada"
                  ? "#22c55e"
                  : "#ef4444"
              };
            "
          >

            ${moeda(caixa.valor)}

          </div>

        </div>

      `;
    });

  abrirRelatorioLista(

    tipo === "entrada"
      ? `📥 Entradas ${mes}`
      : `📤 Saídas ${mes}`,

    html || `
      <div class="card">
        Nenhum lançamento encontrado.
      </div>
    `
  );
}


/* =================================================== */
function abrirRelatorioInadimplentes(
  mes
){

  let html = "";

  safeArray(state.cobrancas)

    .forEach(item => {

      const cobranca =
        cobrancaObj(item);

      if(
        obterMes(cobranca.mes)
        !==
        mes
      ){
        return;
      }

      if(
        String(
          cobranca.status
        )

        .toLowerCase()

        !==

        "pendente"
      ){
        return;
      }

      html += `

        <div class="card">

          <b>
            ${cobranca.nome}
          </b>

          <br>

          ${moeda(cobranca.valor)}

        </div>

      `;
    });

  abrirRelatorioLista(

    `⚠️ Inadimplência ${mes}`,

    html || `
      <div class="card">
        Nenhum inadimplente.
      </div>
    `
  );
}