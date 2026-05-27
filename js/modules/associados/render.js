/* =========================================
   ASSOCIADOS RENDER
========================================= */


/* ========== BADGE STATUS ========== */
function badgeStatusAssociado(
  ativo,
  status
){

  if(!ativo){

    return `

      <span class="
        status-badge
        status-warning
      ">
        ⚫ Inativo
      </span>

    `;
  }

  if(status === "Devedor"){

    return `

      <span class="
        status-badge
        status-danger
      ">
        🔴 Devedor
      </span>

    `;
  }

  return `

    <span class="
      status-badge
      status-success
    ">
      🟢 Regular
    </span>

  `;
}


/* ========== CARD ASSOCIADO ========== */
function renderCardAssociado(a){

  const status =
    statusAssociado(a[2]);

  const ativo =

    normalizarTexto(
      a[7] || "Ativo"
    )

    ===

    "ativo";

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

          ${badgeStatusAssociado(
            ativo,
            status
          )}

        </div>

      </div>

      <div class="acoes-lista">

        <button
          class="btn btn-icon"
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