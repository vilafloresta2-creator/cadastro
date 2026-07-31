/* ---------------------------------------------- 
              ASSOCIADOS RENDER
 ---------------------------------------------- */

/* ============= RENDER ============= */
function renderAssociados(){

  setHTML(
  "tela", `

    <div class="linha-filtros">

      <input
        placeholder="Buscar..."
        id="busca"
      >

      <button
        class="btn"
        onclick="abrirModalMensalidade()"
      >
        💰 Alterar Mensalidade
      </button>

    </div>

    <div id="lista"></div>

    
      <!-- FAB -->
        <button
          class="fab"
          onclick="novoAssociado()"
          aria-label="Novo associado"
        >
          +
        </button>

  `);

  const busca =
    getEl("busca");

  if(busca){

    busca.oninput =
      listarAssociados;
  }

  listarAssociados();
  
}


/* ============= LISTAR ============= */
function listarAssociados(){

  const lista =
    obterAssociadosFiltrados();

  if(!lista.length){

    setHTML(
      "lista",
      renderListaVazia(
        "Nenhum associado encontrado."
      )
    );

    return;
  }

  const html =

    lista

      .map(renderAssociadoCard)

      .join("");

  setHTML(
    "lista",
    html
  );
}


/* ========== RENDER CARD ========== */
function renderAssociadoCard(associado){

  if(!associado){
    return "";
  }

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

  const classeBarra =

    !ativo

      ? classeBarraStatus("parcial")

      : statusFinanceiro === "Devedor"

        ? classeBarraStatus("pendente")

        : classeBarraStatus("pago");

  return renderCardPadrao({

    classe:
      `associado-card ${classeBarra}`,

    titulo:
      associado.nome || "-",

    info:

      ativo

        ? renderStatus({
            texto:"🟢 Ativo",
            tipo:"success"
          })

        : renderStatus({
            texto:"⚫ Inativo",
            tipo:"warning"
          }),

    onclick:
      `editarAssociado('${associado.id}')`,

    botao:

      renderButton({

        texto:"🗑️",

        classe:
          "btn-cancelar btn-icon",

        onclick:`
          event.stopPropagation();
          excluirAssociado('${associado.id}');
        `

      })

  });

}