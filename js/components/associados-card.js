/* =========================================
   ASSOCIADO CARD
========================================= */


/* ========== RENDER CARD ========== */
function renderCardAssociado(a){

  const statusFinanceiro =
    statusFinanceiroAssociado(a[2]);

  const statusCadastro =

    String(a[7] || "Ativo")
      .trim()
      .toLowerCase();

  const ativo =
    statusCadastro === "ativo";

  return `

    <div class="card associado-card">

      <div>

        <div class="associado-nome">

          ${a[1] || "-"}

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
          class="btn btn-icon btn-editar"
          onclick="editar('${a[0]}')"
        >
          ✏️
        </button>

        <button
          class="btn-cancelar btn-icon btn-excluir"
          onclick="excluir('${a[0]}')"
        >
          🗑️
        </button>

      </div>

    </div>

  `;
}