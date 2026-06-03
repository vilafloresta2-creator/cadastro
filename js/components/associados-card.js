/* =========================================
   ASSOCIADO CARD
========================================= */


/* ========== RENDER CARD ========== */
function renderCardAssociado(a){

  const associado = a;

  const statusFinanceiro =
    statusFinanceiroAssociado(
      associado.cpf
    );

  const ativo =

    String(
      associado.status || "Ativo"
    )

      .trim()

      .toLowerCase()

    ===

    "ativo";

  return `

    <div class="card associado-card">

      <div>

        <div class="associado-nome">

          ${associado.nome || "-"}

        </div>

        <div
          class="associado-status"
          style="margin-top:6px;"
        >

          ${
            !ativo

              ? `

                <span class="
                  status-badge
                  status-warning
                ">
                  ⚫ Inativo
                </span>

              `

              : statusFinanceiro === "Devedor"

                ? `

                  <span class="
                    status-badge
                    status-danger
                  ">
                    🔴 Devedor
                  </span>

                `

                : `

                  <span class="
                    status-badge
                    status-success
                  ">
                    🟢 Regular
                  </span>

                `
          }

        </div>

      </div>

      <div class="acoes-lista">

        <button
          class="btn btn-icon"
          onclick="editar('${associado.id}')"
        >
          ✏️
        </button>

        <button
          class="btn-cancelar btn-icon"
          onclick="excluir('${associado.id}')"
        >
          🗑️
        </button>

      </div>

    </div>

  `;
}