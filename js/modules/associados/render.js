/* ============= RENDER ASSOCIADOS ============= */
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
          onclick="novo()"
          aria-label="Novo associado"
        >
          +
        </button>

  `);

  const busca =
    document.getElementById("busca");

  if(busca){

    busca.oninput =
      listarAssociados;
  }

  listarAssociados();
}

/* ============= LISTAR ASSOCIADOS ============= */
function listarAssociados(){

  const lista =
    obterAssociadosFiltrados();

  if(!lista.length){

    setHTML(

      "lista",

      `

        <div class="card">

          Nenhum associado encontrado.

        </div>

      `
    );

    return;
  }

  const html =

    lista

      .map(renderCardAssociado)

      .join("");

  setHTML(
    "lista",
    html
  );
}