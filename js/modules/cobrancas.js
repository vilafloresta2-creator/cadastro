/* =========================================
   COBRANÇAS
========================================= */


/* ============= RENDER COBRANÇAS ============= */
function renderCobrancas(){

  const lista =
    safeArray(state.cobrancas);

  const meses = [

    ...new Set(

      lista
        .map(c =>

          formatarMes(c[3])

        )
        .filter(Boolean)

    )

  ]
    .sort()
    .reverse();

  const mesAtual =
    obterMes(new Date());

  const gerado =
    jaGerouMesAtual();

  tela.innerHTML = `

    <div class="card">

      <div class="cobranca-header">

        <div>

          <p class="muted-text">
            Referente a ${mesAtual}
          </p>

        </div>

      </div>

      <div class="acoes">

        <select
          id="filtroMes"
          style="flex:1;"
        >

          <option value="">
            Todos
          </option>

          ${meses.map(m => `

            <option value="${m}">
              ${m}
            </option>

          `).join("")}

        </select>

        <button
          class="btn"
          onclick="gerarCobrancas()"

          ${gerado ? "disabled" : ""}

          style="
            ${
              gerado
                ? "opacity:.5;cursor:not-allowed;"
                : ""
            }
          "
        >

          ${
            gerado
              ? "✔ Já gerado"
              : "⚡ Gerar"
          }

        </button>

      </div>

    </div>

    <div id="lista"></div>

  `;

  const filtro =
    document.getElementById(
      "filtroMes"
    );

  if(filtro){

    filtro.onchange =
      listarCobrancas;
  }

  listarCobrancas();
}


/* ================== LISTAR ================== */
function listarCobrancas(){

  const filtroMes =

    document.getElementById(
      "filtroMes"
    )?.value || "";

  let lista =
    safeArray(state.cobrancas);

  if(filtroMes){

    lista = lista.filter(c =>

      formatarMes(c[3])
        === filtroMes

    );
  }

  const listaEl =
    document.getElementById(
      "lista"
    );

  if(!listaEl){
    return;
  }

  if(!lista.length){

    listaEl.innerHTML = `

      <div class="card">
        Nenhuma cobrança encontrada.
      </div>

    `;

    return;
  }

  let html = "";

  lista
    .slice()
    .reverse()
    .forEach(c => {

      if(!c || !c.length){
        return;
      }

      const id =
        c[0];

      const nome =
        String(c[1] || "")
          .trim();

      const mes =
        formatarMes(c[3]);

      const valor =
        numero(c[4]);

      const status =

        normalizarTexto(c[5])
          .toLowerCase();

      const recibo =
        String(c[7] || "")
          .trim();

      const pago =
        status === "pago";

      html += `

        <div class="card">

          <div class="cobranca-nome">

            ${nome || "-"}

          </div>

          <div class="cobranca-mes">

            ${mes}

          </div>

          <div class="cobranca-valor">

            ${moeda(valor)}

          </div>

          <div
            class="
              cobranca-status
              ${
                pago
                  ? "text-success"
                  : "text-danger"
              }
            "
          >

            ${
              pago
                ? "Pago"
                : "Pendente"
            }

          </div>

          ${
            !pago
              ? `

                <button
                  class="btn-light"
                  style="margin-top:10px;"
                  onclick="pagar('${id}')"
                >

                  Pagar

                </button>

              `
              : ""
          }

          ${
            pago && recibo
              ? `

                <button
                  class="btn-recibo"
                  style="margin-top:10px;"
                  onclick="reimprimir('${recibo}')"
                >

                  🧾 Reimprimir

                </button>

              `
              : ""
          }

        </div>

      `;
    });

  listaEl.innerHTML =
    html;
}


/* ================== PAGAR ================== */
async function pagar(id){

  const item =
    safeArray(state.cobrancas)
      .find(c =>

        String(c[0]) ===
        String(id)

      );

  if(!item){

    showToast(
      "Cobrança não encontrada",
      "error"
    );

    return;
  }

  const confirmado =
    await showConfirm(
      "Confirmar pagamento?"
    );

  if(!confirmado){
    return;
  }

  showLoading(
    "Registrando pagamento..."
  );

  try{

    const resp =
      await postAPI({

        acao:"pagar",

        id

      });

    if(resp.erro){

      showToast(
        resp.erro,
        "error"
      );

      return;
    }

    const numeroRecibo =
      resp.recibo;

    await carregar();

    gerarRecibo(
      item,
      numeroRecibo
    );

    showToast(
      "Pagamento registrado!",
      "success"
    );

  }catch(error){

    console.error(error);

    showToast(
      "Erro ao registrar pagamento",
      "error"
    );

  }finally{

    hideLoading();
  }
}


/* ============= GERAR COBRANÇAS ============= */
async function gerarCobrancas(){

  const confirmado =
    await showConfirm(
      "Deseja gerar cobranças do mês atual?"
    );

  if(!confirmado){
    return;
  }

  showLoading(
    "Gerando cobranças..."
  );

  try{

    const resp =
      await postAPI({

        acao:
          "gerar_cobrancas"

      });

    if(resp.erro){

      showToast(
        resp.erro,
        "error"
      );

      return;
    }

    showToast(
      "Cobranças geradas!",
      "success"
    );

    await carregar();

  }catch(error){

    console.error(error);

    showToast(
      "Erro ao gerar cobranças",
      "error"
    );

  }finally{

    hideLoading();
  }
}