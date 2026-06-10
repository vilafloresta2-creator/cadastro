/* =========================================
   DEVEDORES
========================================= */


/* ============= RENDER DEVEDORES ============= */
function renderDevedores(){

  const meses = [

    ...new Set(

      safeArray(state.cobrancas)

        .map(c => {

          const cobranca =
            cobrancaObj(c);

          return String(
            cobranca.mes || ""
          ).trim();

        })

        .filter(Boolean)

    )

  ]

    .sort()
    .reverse();

  tela.innerHTML = `

    <div
      class="box"
      style="margin-bottom:10px;"
    >

      <b>Total em aberto</b><br>

      <span id="totalDivida">
        ${moeda(0)}
      </span>

    </div>

    <div class="linha-filtros">

      <input
        id="buscaDevedor"
        placeholder="Buscar devedor..."
      >

      <select id="filtroMesDevedor">

        <option value="">
          Todos
        </option>

        ${meses.map(m => `

          <option value="${m}">
            ${formatarMes(m)}
          </option>

        `).join("")}

      </select>

    </div>

    <div id="listaDevedores"></div>

  `;

  const busca =
    document.getElementById(
      "buscaDevedor"
    );

  const filtro =
    document.getElementById(
      "filtroMesDevedor"
    );

  if(busca){

    busca.addEventListener(
      "input",
      listarDevedores
    );
  }

  if(filtro){

    filtro.addEventListener(
      "change",
      listarDevedores
    );
  }

  listarDevedores();
}


/* ============= LISTAR DEVEDORES ============= */
function listarDevedores(){

  const busca =

    normalizarTexto(

      document.getElementById(
        "buscaDevedor"
      )?.value || ""

    );

  const mes =

    String(

      document.getElementById(
        "filtroMesDevedor"
      )?.value || ""

    ).trim();

  let lista =

  safeArray(state.cobrancas)

    .filter(c => {

      const cobranca =
        cobrancaObj(c);

      return (

        String(cobranca.status || "")
          .trim()
          .toLowerCase()

        ===

        "pendente"

      );

    });


  /* ================= BUSCA ================= */
  if(busca){

    lista = lista.filter(c => {

      const cobranca =
        cobrancaObj(c);

      return normalizarTexto(
        cobranca.nome
      ).includes(busca);

    });
  }


  /* ============== FILTRO MÊS ============== */
  if(mes){

    lista = lista.filter(c => {

      const cobranca =
        cobrancaObj(c);

      return (

        String(
          cobranca.mes || ""
        ).trim()

        ===

        mes

      );

    });
  }


  /* ================ ORDENAÇÃO ================ */
  lista.sort((a, b) => {

    const cb =
      cobrancaObj(b);

    const ca =
      cobrancaObj(a);

    return (

      cb.valor

      -

      ca.valor

    );

  });

  let total = 0;

  let html = "";


  /* ============== LISTA VAZIA ============== */
  if(!lista.length){

    html = `

      <div class="card">
        Nenhum devedor encontrado 🎉
      </div>

    `;
  }


  /* ================= RENDER ================= */
  lista.forEach(c => {

    if(!c || !c.length){
      return;
    }

    const cobranca =
      cobrancaObj(c);

    const nome =
      cobranca.nome || "-";

    const mesFormatado =
      formatarMes(
        cobranca.mes
      );

    const valor =
      cobranca.valor;

    total += valor;

    html += `

      <div
        class="card"
        style="
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:10px;
        "
      >

        <div>

          <div style="
            font-size:16px;
            font-weight:600;
          ">

            ${nome}

          </div>

          <div style="
            font-size:12px;
            color:#ef4444;
            margin-top:4px;
          ">

            ${mesFormatado} • Em aberto

          </div>

          <div style="
            margin-top:6px;
            font-weight:bold;
          ">

            ${moeda(valor)}

          </div>

        </div>

        <button
          class="btn"
          style="
            font-size:12px;
            padding:6px 12px;
            white-space:nowrap;
          "
          onclick="ir('cobrancas')"
        >

          Ver

        </button>

      </div>

    `;
  });


  /* ================= TOTAL ================= */
  const totalEl =

    document.getElementById(
      "totalDivida"
    );

  if(totalEl){

    totalEl.innerText =
      moeda(total);
  }

  const listaEl =

    document.getElementById(
      "listaDevedores"
    );

  if(listaEl){

    listaEl.innerHTML = html;
  }
}