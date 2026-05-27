/* =========================================
   ASSOCIADOS
========================================= */


/* ============= RENDER ASSOCIADOS ============= */
function renderAssociados(){

  tela.innerHTML = `

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

  `;

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


/* ============= NOVO ASSOCIADO ============= */
function novo(){

  state.editandoId = null;

  setText(
    "modalTitulo",
    "Novo Associado"
  );

  limparFormularioAssociado();

  abrirModal();
}


/* ============= EDITAR ASSOCIADO ============= */
function editar(id){

  const associado =

    safeArray(state.associados)

      .find(x =>

        String(x[0])

        ===

        String(id)

      );

  if(!associado){

    showToast(
      "Associado não encontrado",
      "error"
    );

    return;
  }

  state.editandoId =
    String(id);

  setText(
    "modalTitulo",
    "Editar Associado"
  );

  preencherFormularioAssociado(
    associado
  );

  limparErrosCampos?.();

  abrirModal();
}


/* ================= EXCLUIR ================= */
async function excluir(id){

  const ok =
    await excluirAssociado(id);

  if(!ok){
    return;
  }

  await carregar();
}


/* ========= SALVAR MENSALIDADE ========= */
async function salvarMensalidade(){

  const ok =
    await atualizarMensalidade();

  if(!ok){
    return;
  }

  fecharModalMensalidade();

  await carregar();
}


/* =============== SALVAR MODAL =============== */
async function salvarModal(){

  const ok =
    await salvarAssociado();

  if(!ok){
    return;
  }

  fecharModal();

  await carregar();
}