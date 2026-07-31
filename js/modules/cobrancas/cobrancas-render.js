/* ----------------------------------------------
              COBRANCAS RENDER
---------------------------------------------- */

/* ========== RENDER ========== */
function renderCobrancas(){

  const kpi =
    obterKPIsDashboard();

  const mesAtual =
    obterMes(new Date());

  setHTML(
    "tela",
    `         
      
        ${renderCardKPI({

          titulo:"Inadimplência",

          valor:
            moeda(kpi.inadimplencia),

          classe:
            "text-warning",

          onclick:
            `abrirRelatorioInadimplentes('${mesAtual}')`

        })}


      <div class="linha-filtros">

        <input
          id="buscaCobranca"
          placeholder="Buscar associado..."
        >

        <input
          type="month"
          id="filtroMes"
        >

        <label
          style="
            display:flex;
            align-items:center;
            gap:6px;
          "
        >

          <input
            type="checkbox"
            id="chkPendentes"
            onchange="listarCobrancas()"
          >

          Pendentes

        </label>

        <button
          class="btn"
          onclick="gerarCobrancas()"
        >
          Gerar Cobranças
        </button>

      </div>

      <div id="lista"></div>

    `
  );

  getEl("buscaCobranca")
    ?.addEventListener(
      "input",
      listarCobrancas
    );

  getEl("filtroMes")
    ?.addEventListener(
      "change",
      listarCobrancas
    );

  listarCobrancas();

}


/* ========== LISTAR ========== */
function listarCobrancas(){

  const filtroMes =
    getValue("filtroMes");

  const busca =

    normalizarTexto(
      getValue("buscaCobranca")
    )

      .toLowerCase();

  const mostrarSomentePendentes =

    Boolean(
      getEl("chkPendentes")
        ?.checked
    );

  let lista =

    safeArray(state.cobrancas)

      .map(cobrancaObj);

  /* ===== FILTRO MÊS ===== */

  lista =
    filtrarCobrancasPorMes(
      lista,
      filtroMes
    );

  /* ===== BUSCA ===== */

  if(busca){

    lista =

      lista.filter(c =>

        normalizarTexto(c.nome)

          .toLowerCase()

          .includes(busca)

      );

  }

  /* ===== SOMENTE PENDENTES ===== */

  if(mostrarSomentePendentes){

    lista =

      lista.filter(c =>

        String(c.status)

          .toLowerCase()

          !==

          "pago"

      );

  }  

  /* ===== LISTA VAZIA ===== */

  if(!lista.length){

    setHTML(

      "lista",

      renderListaVazia(
        "Nenhuma cobrança encontrada."
      )

    );

    return;

  }

  /* ===== RENDER ===== */

  setHTML(

    "lista",

    lista

      .slice()

      .reverse()

      .map(c =>

        renderCobrancaCard(

          c,

          {

            mostrarPagar:true,

            mostrarReimprimir:true

          }

        )

      )

      .join("")

  );

}


/* ========== CARD ========== */
function renderCobrancaCard(

  cobranca,
  opcoes = {}

){

  if(!cobranca){
    return "";
  }

  const {

    ocultarPago = false,

    mostrarReimprimir = true,

    mostrarPagar = true

  } = opcoes;

  const pago =

    String(cobranca.status || "")
      .trim()
      .toLowerCase()

    === "pago";

  if(

    ocultarPago

    &&

    pago

  ){

    return "";

  }

  const classeBarra =

    classeBarraStatus(
      cobranca.status
    );

  return `

    <div
      class="card cobranca-card ${classeBarra}"
    >

      <div>

        <div class="cobranca-nome">

          ${cobranca.nome}

        </div>

        <div class="cobranca-mes">

          ${formatarMes(
            cobranca.mes
          )}

        </div>

      </div>

      ${renderActions(`

        ${renderInfoValor(

          "Valor",

          moeda(cobranca.valor)

        )}

        ${

          !pago && mostrarPagar

            ?

            renderButton({

              texto:"Pagar",

              classe:"btn",

              onclick:
                `pagar('${cobranca.id}')`

            })

            :

            ""

        }

        ${

          pago

          &&

          cobranca.recibo

          &&

          mostrarReimprimir

            ?

            renderButton({

              texto:"🧾 Recibo",

              classe:"btn-recibo",

              onclick:
                `reimprimir('${cobranca.recibo}')`

            })

            :

            ""

        }

      `)}

    </div>

  `;

}