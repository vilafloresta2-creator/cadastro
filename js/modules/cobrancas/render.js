/* =========================================
   COBRANCAS RENDER
========================================= */


/* ========== CARD ========== */
function renderCardCobranca(c){

  if(!c){
    return "";
  }

  const cobranca =
    cobrancaObj(c);

  const pago =

    normalizarTexto(
      cobranca.status
    )

      .toLowerCase()

    ===

    "pago";

  return `

    <div class="card">

      <div class="cobranca-nome">
        ${cobranca.nome || "-"}
      </div>

      <div class="cobranca-mes">
        ${formatarMes(cobranca.mes)}
      </div>

      <div class="cobranca-valor">
        ${moeda(cobranca.valor)}
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
              onclick="pagar('${cobranca.id}')"
            >

              Pagar

            </button>

          `
          : ""
      }

      ${
        pago && cobranca.recibo
          ? `

            <button
              class="btn-recibo"
              style="margin-top:10px;"
              onclick="reimprimir('${cobranca.recibo}')"
            >

              🧾 Reimprimir

            </button>

          `
          : ""
      }

    </div>

  `;
}