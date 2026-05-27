/* =========================================
   ASSOCIADO CARD
========================================= */


/* ========== RENDER CARD ========== */
function renderCardAssociado(a){

  const status =
    statusAssociado(a[2]);

  const statusCadastro =

    String(a[7] || "Ativo")
      .trim()
      .toLowerCase();

  const ativo =
    statusCadastro !== "inativo";

  return `

    <div class="card associado-card">

      <div>

        <div class="associado-nome">
          ${a[1] || "-"}
        </div>

        <div
          class="associado-status"
          style="
            color:${
              !ativo
                ? "#9ca3af"
                : status === "Devedor"
                  ? "#ef4444"
                  : "#22c55e"
            };
          "
        >

          ${
            !ativo
              ? "⚫ Inativo"
              : status === "Devedor"
                ? "🔴 Devedor"
                : "🟢 Regular"
          }

        </div>

      </div>

      <div class="acoes-lista">

        <button
          class="btn-edit btn-icon"
          onclick="editar('${a[0]}')"
        >
          ✏️
        </button>

        <button
          class="btn-cancelar btn-icon"
          onclick="excluir('${a[0]}')"
        >
          🗑️
        </button>

      </div>

    </div>

  `;
}