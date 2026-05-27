/* =========================================
   COBRANCAS RENDER
========================================= */


/* ========== CARD ========== */
function renderCardCobranca(c){

  if(!c || !c.length){
    return "";
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

  return `

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
}