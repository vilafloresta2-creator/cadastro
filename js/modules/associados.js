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

  const termoBusca =
    normalizarTexto(

      document.getElementById("busca")
        ?.value || ""

    );

  const lista =
    safeArray(state.associados)
      .filter(a => {

        if(!a || !a.length){
          return false;
        }

        const nome =
          normalizarTexto(a[1]);

        return nome.includes(
          termoBusca
        );

      });

  let html = "";


  /* =============== LISTA VAZIA =============== */
  if(!lista.length){

    html = `
      <div class="card">
        Nenhum associado encontrado.
      </div>
    `;
  }


  /* ================== LISTA ================== */
  lista.forEach(a => {

    const status =
      statusAssociado(a[2]);

    const ativo =

      normalizarTexto(
        a[7] || "Ativo"
      )

      ===

      "ativo";

    html += `

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
  });

  const listaEl =
    document.getElementById("lista");

  if(listaEl){

    listaEl.innerHTML =
      html;
  }
}


/* ============= NOVO ASSOCIADO ============= */
function novo(){

  const modalTitulo =
    document.getElementById(
      "modalTitulo"
    );

  if(modalTitulo){

    modalTitulo.innerText =
      "Novo Associado";
  }

  document.getElementById("m_nome").value = "";
  document.getElementById("m_cpf").value = "";
  document.getElementById("m_tel").value = "";
  document.getElementById("m_email").value = "";
  document.getElementById("m_endereco").value = "";
  document.getElementById("m_mensal").value = "";
  document.getElementById("m_status").value = "Ativo";

  state.editandoId =
    null;

  limparErrosCampos();

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

  document.getElementById("m_nome").value =

    String(
      associado[1] || ""
    ).trim();

  document.getElementById("m_cpf").value =

    maskCPF(
      associado[2]
    );

  document.getElementById("m_tel").value =

    String(
      associado[3] || ""
    ).trim();

  document.getElementById("m_email").value =

    String(
      associado[4] || ""
    ).trim();

  document.getElementById("m_endereco").value =

    String(
      associado[5] || ""
    ).trim();

  document.getElementById("m_mensal").value =

    numero(
      associado[6]
    );

  document.getElementById("m_status").value =

    associado[7] || "Ativo";

  const modalTitulo =
    document.getElementById(
      "modalTitulo"
    );

  if(modalTitulo){

    modalTitulo.innerText =
      "Editar Associado";
  }

  limparErrosCampos();

  abrirModal();
}


/* ================= EXCLUIR ================= */
function excluir(id){

  const confirmado =
    await showConfirm(
      "Tem certeza que deseja excluir este associado?"
    );

  if(!confirmado){
    return;
  }

  showLoading(
    "Excluindo associado..."
  );

  try{

    const resp =
      await postAPI({

        acao:
          "excluir_associado",

        id

      });

    if(resp.erro){

      showToast(
        resp.erro,
        "error"
      );

      return;
    }

    showToast(
      "Associado excluído!",
      "success"
    );

    await carregar();

  }catch(error){

    console.error(error);

    showToast(
      "Erro ao excluir associado",
      "error"
    );

  }finally{

    hideLoading();
  }
}


/* ========= SALVAR MENSALIDADE ========= */
function salvarMensalidade(){

  const valor =
    numero(

      document.getElementById(
        "novoValorMensalidade"
      )?.value

    );

  if(!valorPositivo(valor)){

    showToast(
      "Informe um valor válido",
      "warning"
    );

    return;
  }

  const confirmado =
    await showConfirm(
      "Deseja aplicar esse valor para TODOS os associados?"
    );

  if(!confirmado){
    return;
  }

  showLoading(
    "Atualizando mensalidade..."
  );

  try{

    const resp =
      await postAPI({

        acao:
          "mensalidade_todos",

        valor

      });

    if(resp.erro){

      showToast(
        resp.erro,
        "error"
      );

      return;
    }

    fecharModalMensalidade();

    showToast(
      "Mensalidade atualizada!",
      "success"
    );

    await carregar();

  }catch(error){

    console.error(error);

    showToast(
      "Erro ao atualizar mensalidade",
      "error"
    );

  }finally{

    hideLoading();
  }
}


/* =============== SALVAR MODAL =============== */
function salvarModal(){

  if(!validarCampos()){

    showToast(
      "Preencha corretamente",
      "warning"
    );

    return;
  }

  const editando =
    !!state.editandoId;

  const btn =
    document.getElementById(
      "btnSalvar"
    );

  if(btn){

    btn.disabled = true;

    btn.innerText =
      "Salvando...";
  }

  showLoading(
    "Salvando associado..."
  );

  try{

    const resp =
      await postAPI({

        acao:
          "salvar_associado",

        id:
          state.editandoId,

        nome:
          String(
            document.getElementById("m_nome")?.value || ""
          ).trim(),

        cpf:
          limparCPF(
            document.getElementById("m_cpf")?.value
          ),

        telefone:
          String(
            document.getElementById("m_tel")?.value || ""
          ).replace(/\D/g,""),

        email:
          String(
            document.getElementById("m_email")?.value || ""
          ).trim(),

        endereco:
          String(
            document.getElementById("m_endereco")?.value || ""
          ).trim(),

        mensalidade:
          numero(
            document.getElementById("m_mensal")?.value
          ),

        status:
          document.getElementById("m_status")?.value || "Ativo"

      });

    if(resp.erro){

      showToast(
        resp.erro,
        "error"
      );

      return;
    }

    fecharModal();

    showToast(

      editando
        ? "Associado atualizado!"
        : "Associado cadastrado!",

      "success"

    );

    await carregar();

  }catch(error){

    console.error(error);

    showToast(
      "Erro ao salvar associado",
      "error"
    );

  }finally{

    if(btn){

      btn.disabled = false;

      btn.innerText =
        "Salvar";
    }

    hideLoading();
  }
}