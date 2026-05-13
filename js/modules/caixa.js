/* ================= RENDER CAIXA ================= */
function renderCaixa(){

  tela.innerHTML = `

    <div class="top">

      <div class="box">
        <b>Entradas</b><br>
        <span id="totalEntradas">R$ 0.00</span>
      </div>

      <div class="box">
        <b>Saídas</b><br>
        <span id="totalSaidas">R$ 0.00</span>
      </div>

      <div class="box">
        <b>Saldo</b><br>
        <span id="saldoFinal">R$ 0.00</span>
      </div>

    </div>

    <div class="card" style="margin-top:15px;">

      <div style="display:flex;gap:10px;flex-wrap:wrap;">

        <select id="cx_tipo" style="flex:1;min-width:150px;">
          <option value="Entrada">Entrada</option>
          <option value="Saida">Saída</option>
        </select>

        <input id="cx_categoria" placeholder="Categoria" style="flex:1;min-width:180px;">

      </div>

      <div style="display:flex;gap:10px;margin-top:10px;flex-wrap:wrap;">

        <input id="cx_descricao" placeholder="Descrição" style="flex:2;min-width:220px;">

        <input id="cx_valor" type="number" step="0.01" placeholder="Valor" style="flex:1;min-width:120px;">

      </div>

      <button class="btn" style="margin-top:12px;" onclick="salvarCaixa()">
        💾 Lançar
      </button>

      <button class="btn" style="margin-top:10px;" onclick="fecharMes()">
        💰 Fechar Mês
      </button>

    </div>

    <div id="listaCaixa"></div>

  `;

  listarCaixa();
}

/* ================= LISTAR CAIXA ================= */
function listarCaixa(){

  let entradas = 0;
  let saidas = 0;

  let html = "";

  caixa.slice().reverse().forEach(c => {

    const tipo = c[2];
    const categoria = c[3];
    const descricao = c[4];
    const valor = Number(c[5]);
    const data = formatarData(c[1]);

    if(tipo === "Entrada"){
      entradas += valor;
    }else{
      saidas += valor;
    }

    html += `

      <div class="card" style="display:flex;justify-content:space-between;align-items:center;">

        <div>

          <div style="font-size:16px;font-weight:600;">
            ${descricao}
          </div>

          <div style="font-size:12px;opacity:0.7;">
            ${categoria} • ${data}
          </div>

        </div>

        <div style="display:flex;align-items:center;gap:8px;">

          <div style="
            font-weight:bold;
            color:${tipo === "Entrada" ? "#22c55e" : "#ef4444"};
          ">
            ${tipo === "Entrada" ? "+" : "-"}
            R$ ${valor.toFixed(2)}
          </div>

          <button class="btn-edit btn-icon"
            onclick="editarCaixa('${c[0]}')">
            ✏️
          </button>

          <button class="btn-cancelar btn-icon"
            onclick="excluirCaixa('${c[0]}')">
            🗑️
          </button>

        </div>

      </div>

    `;

  });

  document.getElementById("listaCaixa").innerHTML = html;

  document.getElementById("totalEntradas").innerText =
    "R$ " + entradas.toFixed(2);

  document.getElementById("totalSaidas").innerText =
    "R$ " + saidas.toFixed(2);

  document.getElementById("saldoFinal").innerText =
    "R$ " + (entradas - saidas).toFixed(2);
}

/* ============ 💾 SALVAR CAIXA =================== */
async function salvarCaixa(){

  const tipo = document.getElementById("cx_tipo").value;
  const categoria = document.getElementById("cx_categoria").value;
  const descricao = document.getElementById("cx_descricao").value;
  const valor = document.getElementById("cx_valor").value;

  if(!categoria || !descricao || !valor){
    alert("Preencha os campos");
    return;
  }

  await fetch(API,{
    method:"POST",
    body: JSON.stringify({
      acao:"lancar_caixa",
      id: editandoCaixa,
      tipo,
      categoria,
      descricao,
      valor
    })
  });

  editandoCaixa = null;
  document.getElementById("cx_categoria").value = "";
  document.getElementById("cx_descricao").value = "";
  document.getElementById("cx_valor").value = "";

  await carregar();
  renderCaixa();
}

/* ================= EXCLUIR CAIXA ================= */
async function excluirCaixa(id){

  if(!confirm("Excluir lançamento?")){
    return;
  }

  await fetch(API,{
    method:"POST",
    body: JSON.stringify({
      acao:"excluir_caixa",
      id
    })
  });

  await carregar();
  renderCaixa();
}

/* INIT */
async function init(){
  await carregar();
  ir("dashboard");
}

init();