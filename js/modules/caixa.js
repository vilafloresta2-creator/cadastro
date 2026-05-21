/* =========================================
   CAIXA
========================================= */


/* =============== RENDER CAIXA =============== */
function renderCaixa(){

  tela.innerHTML = `

    <div class="top">

      <div class="box">
        <b>Entradas</b><br>
        <span id="totalEntradas">
          ${moeda(0)}
        </span>
      </div>

      <div class="box">
        <b>Saídas</b><br>
        <span id="totalSaidas">
          ${moeda(0)}
        </span>
      </div>

      <div class="box">
        <b>Saldo</b><br>
        <span id="saldoFinal">
          ${moeda(0)}
        </span>
      </div>

    </div>

    <div
      class="card"
      style="margin-top:15px;"
    >

      <div
        style="
          display:flex;
          gap:10px;
          flex-wrap:wrap;
        "
      >

        <select
          id="cx_tipo"
          style="
            flex:1;
            min-width:150px;
          "
        >
          <option value="Entrada">
            Entrada
          </option>

          <option value="Saída">
            Saída
          </option>
        </select>

        <input
          id="cx_categoria"
          placeholder="Categoria"
          style="
            flex:1;
            min-width:180px;
          "
        >

      </div>

      <div
        style="
          display:flex;
          gap:10px;
          margin-top:10px;
          flex-wrap:wrap;
        "
      >

        <input
          id="cx_descricao"
          placeholder="Descrição"
          style="
            flex:2;
            min-width:220px;
          "
        >

        <input
          id="cx_valor"
          type="number"
          step="0.01"
          placeholder="Valor"
          style="
            flex:1;
            min-width:120px;
          "
        >

      </div>

      <div
        style="
          display:flex;
          gap:10px;
          flex-wrap:wrap;
          margin-top:12px;
        "
      >

        <button
          class="btn"
          onclick="salvarCaixa()"
        >

          ${
            state.editandoCaixa
              ? "💾 Atualizar"
              : "💾 Lançar"
          }

        </button>

        ${
          state.editandoCaixa
            ? `
              <button
                class="btn-cancelar"
                onclick="cancelarEdicaoCaixa()"
              >
                Cancelar edição
              </button>
            `
            : ""
        }

        <button
          class="btn"
          onclick="fecharMes()"
        >
          💰 Fechar Mês
        </button>

      </div>

    </div>

    <div id="listaCaixa"></div>

  `;

  if(state.editandoCaixa){

    const item =
      safeArray(state.caixa)
        .find(c =>

          String(c[0])
            ===
          String(state.editandoCaixa)

        );

    if(item){

      document.getElementById(
        "cx_tipo"
      ).value =

        String(item[2] || "");

      document.getElementById(
        "cx_categoria"
      ).value =

        String(item[3] || "");

      document.getElementById(
        "cx_descricao"
      ).value =

        String(item[4] || "");

      document.getElementById(
        "cx_valor"
      ).value =

        numero(item[5]);
    }
  }

  listarCaixa();
}


/* =============== LISTAR CAIXA =============== */
function listarCaixa(){

  const lista =
    safeArray(state.caixa);

  const listaEl =
    document.getElementById(
      "listaCaixa"
    );

  if(!listaEl){
    return;
  }

  if(!lista.length){

    listaEl.innerHTML = `

      <div class="card">
        Nenhum lançamento encontrado.
      </div>

    `;

    atualizarResumoCaixa(
      0,
      0
    );

    return;
  }

  let entradas = 0;
  let saidas = 0;

  let html = "";

  lista
    .slice()
    .reverse()
    .forEach(c => {

      if(!Array.isArray(c)){
        return;
      }

      const id =
        String(c[0] || "");

      const tipo =
        String(c[2] || "")
          .trim();

      const categoria =
        String(c[3] || "")
          .trim();

      const descricao =
        String(c[4] || "")
          .trim();

      const valor =
        numero(c[5]);

      const data =
        formatarData(c[1]);

      const entrada =
        isEntrada(tipo);

      const saida =
        isSaida(tipo);

      if(entrada){
        entradas += valor;
      }

      if(saida){
        saidas += valor;
      }

      html += `

        <div
          class="card"
          style="
            display:flex;
            justify-content:space-between;
            align-items:center;
            gap:12px;
            flex-wrap:wrap;
          "
        >

          <div>

            <div
              style="
                font-size:16px;
                font-weight:600;
              "
            >
              ${descricao || "-"}
            </div>

            <div
              style="
                font-size:12px;
                opacity:.7;
              "
            >
              ${categoria || "-"}
              •
              ${data}
            </div>

          </div>

          <div
            style="
              display:flex;
              align-items:center;
              gap:8px;
            "
          >

            <div
              style="
                font-weight:bold;
                color:${
                  entrada
                    ? "#22c55e"
                    : "#ef4444"
                };
              "
            >

              ${
                entrada
                  ? "+"
                  : "-"
              }

              ${moeda(valor)}

            </div>

            <button
              class="btn-edit btn-icon"
              onclick="editarCaixa('${id}')"
              title="Editar"
            >
              ✏️
            </button>

            <button
              class="btn-cancelar btn-icon"
              onclick="excluirCaixa('${id}')"
              title="Excluir"
            >
              🗑️
            </button>

          </div>

        </div>

      `;
    });

  listaEl.innerHTML = html;

  atualizarResumoCaixa(
    entradas,
    saidas
  );
}


/* ========== ATUALIZAR RESUMO ========== */
function atualizarResumoCaixa(
  entradas = 0,
  saidas = 0
){

  const saldo =
    entradas - saidas;

  const entradasEl =
    document.getElementById(
      "totalEntradas"
    );

  const saidasEl =
    document.getElementById(
      "totalSaidas"
    );

  const saldoEl =
    document.getElementById(
      "saldoFinal"
    );

  if(entradasEl){
    entradasEl.innerText =
      moeda(entradas);
  }

  if(saidasEl){
    saidasEl.innerText =
      moeda(saidas);
  }

  if(saldoEl){

    saldoEl.innerText =
      moeda(saldo);

    saldoEl.style.color =
      saldo >= 0
        ? "#22c55e"
        : "#ef4444";
  }
}


/* =============== SALVAR CAIXA =============== */
async function salvarCaixa(){

  const tipo =
    document.getElementById(
      "cx_tipo"
    )?.value;

  const categoria =
    String(
      document.getElementById(
        "cx_categoria"
      )?.value || ""
    ).trim();

  const descricao =
    String(
      document.getElementById(
        "cx_descricao"
      )?.value || ""
    ).trim();

  const valor =
    numero(
      document.getElementById(
        "cx_valor"
      )?.value
    );

  if(
    !categoria
    ||
    !descricao
    ||
    !valorPositivo(valor)
  ){

    showToast(
      "Preencha os campos corretamente",
      "warning"
    );

    return;
  }

  showLoading(

    state.editandoCaixa
      ? "Atualizando lançamento..."
      : "Salvando lançamento..."

  );

  try{

    const resp =
      await postAPI({

        acao:
          "lancar_caixa",

        id:
          state.editandoCaixa,

        tipo,
        categoria,
        descricao,
        valor

      });

    if(resp.erro){

      showToast(
        resp.erro,
        "error"
      );

      return;
    }

    limparFormularioCaixa();

    showToast(

      state.editandoCaixa
        ? "Lançamento atualizado!"
        : "Lançamento salvo!",

      "success"

    );

    state.editandoCaixa =
      null;

    await carregar();

  }catch(error){

    console.error(error);

    showToast(
      "Erro ao salvar lançamento",
      "error"
    );

  }finally{

    hideLoading();
  }
}


/* =============== EDITAR CAIXA =============== */
function editarCaixa(id){

  const item =
    safeArray(state.caixa)
      .find(c =>

        String(c[0])
          ===
        String(id)

      );

  if(!item){

    showToast(
      "Lançamento não encontrado",
      "error"
    );

    return;
  }

  state.editandoCaixa =
    String(id);

  renderCaixa();

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });

  setTimeout(() => {

    document.getElementById(
      "cx_categoria"
    )?.focus();

  }, 100);
}


/* ========== CANCELAR EDIÇÃO ========== */
function cancelarEdicaoCaixa(){

  state.editandoCaixa =
    null;

  limparFormularioCaixa();

  renderCaixa();
}


/* ========== LIMPAR FORMULÁRIO ========== */
function limparFormularioCaixa(){

  const categoria =
    document.getElementById(
      "cx_categoria"
    );

  const descricao =
    document.getElementById(
      "cx_descricao"
    );

  const valor =
    document.getElementById(
      "cx_valor"
    );

  if(categoria){
    categoria.value = "";
  }

  if(descricao){
    descricao.value = "";
  }

  if(valor){
    valor.value = "";
  }
}


/* ============== EXCLUIR CAIXA ============== */
async function excluirCaixa(id){

  const confirmado =
    await showConfirm(
      "Excluir lançamento?"
    );

  if(!confirmado){
    return;
  }

  showLoading(
    "Excluindo lançamento..."
  );

  try{

    const resp =
      await postAPI({

        acao:
          "excluir_caixa",

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
      "Lançamento excluído!",
      "success"
    );

    await carregar();

  }catch(error){

    console.error(error);

    showToast(
      "Erro ao excluir lançamento",
      "error"
    );

  }finally{

    hideLoading();
  }
}


/* ================ FECHAR MÊS ================ */
async function fecharMes(){

  const mes = window.prompt(
    "Informe o mês (YYYY-MM)"
  );

  if(!mes){
    return;
  }

  const texto =
    String(mes).trim();

  if(
    !/^\d{4}-\d{2}$/.test(texto)
  ){

    showToast(
      "Formato inválido. Use YYYY-MM",
      "warning"
    );

    return;
  }

  const confirmado =
    confirm(
      `Fechar mês ${texto}?`
    );

  if(!confirmado){
    return;
  }

  showLoading(
    "Fechando mês..."
  );

  try{

    const resp =
      await postAPI({

        acao:"fechar_mes",
        mes:texto

      });

    if(resp.erro){

      showToast(
        resp.erro,
        "error"
      );

      return;
    }

    showToast(
      "Fechamento realizado!",
      "success"
    );

    await carregar();

  }catch(error){

    console.error(error);

    showToast(
      "Erro ao fechar mês",
      "error"
    );

  }finally{

    hideLoading();
  }
}