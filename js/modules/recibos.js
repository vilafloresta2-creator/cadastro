/* ============== RENDER RECIBOS ============== */
function renderRecibos(){

  // garante array
  if(!Array.isArray(recibos)){
    recibos = [];
  }

  const meses = [
    ...new Set(
      recibos.map(r => r[4])
    )
  ];

  tela.innerHTML = `

    <div class="filtro-linha"
      style="display:flex; gap:10px; margin-bottom:10px; flex-wrap:wrap;">

      <input
        id="buscaRecibo"
        placeholder="Buscar..."
        style="flex:1; min-width:200px;">

      <select id="filtroMesRecibo"
        style="width:200px;">

        <option value="">Todos</option>

        ${meses.map(m => `
          <option value="${m}">
            ${formatarMes(m)}
          </option>
        `).join("")}

      </select>

    </div>

    <div id="listaRecibos"></div>

  `;

  document.getElementById("buscaRecibo")
    .oninput = listarRecibos;

  document.getElementById("filtroMesRecibo")
    .onchange = listarRecibos;

  listarRecibos();
}


/* ============== LISTAR RECIBOS ============== */
function listarRecibos(){

  const busca =
    (
      document.getElementById("buscaRecibo")?.value || ""
    ).toLowerCase();

  const mes =
    document.getElementById("filtroMesRecibo")?.value || "";

  let lista = [...recibos];

  if(busca){

    lista = lista.filter(r =>
      String(r[2] || "")
        .toLowerCase()
        .includes(busca)
    );
  }

  if(mes){

    lista = lista.filter(r =>
      String(r[4]) === String(mes)
    );
  }

  let html = "";

  if(!lista.length){

    html = `
      <div class="card">
        Nenhum recibo encontrado.
      </div>
    `;
  }

  lista.reverse().forEach(r => {

    const numero = r[1];
    const nome = r[2];
    const valor = Number(r[5] || 0).toFixed(2);
    const data = formatarData(r[6]);

    html += `

      <div class="card"
        style="display:flex;justify-content:space-between;align-items:center;">

        <div>

          <div style="font-size:16px;font-weight:600;">
            ${nome}
          </div>

          <div style="font-size:12px;opacity:0.7;">
            ${numero} • ${data}
          </div>

          <div style="margin-top:5px;">
            R$ ${valor}
          </div>

        </div>

        <button
          class="btn-recibo"
          style="font-size:12px;padding:6px 10px;"
          onclick="reimprimir('${numero}')">

          🧾 Reimprimir

        </button>

      </div>

    `;
  });

  document.getElementById("listaRecibos")
    .innerHTML = html;
}


/* ============ GERAR RECIBOS HTML ============ */
function gerarHTMLRecibo(dados){

  return `

    <div style="
      font-family:Arial;
      max-width:400px;
      padding:20px;
      border:1px solid #ccc;
      border-radius:10px;
      margin:auto;
    ">

      <div style="text-align:center;">

        <img
          src="https://github.com/vilafloresta2-creator/cadastro/blob/main/logo.png?raw=true"
          style="height:70px;">

        <br>

        <b style="font-size:18px;">
          Vila Floresta 2
        </b>

      </div>

      <hr>

      <h3 style="text-align:center;">
        RECIBO
      </h3>

      <p><b>Nº:</b> ${dados.numero}</p>
      <p><b>Nome:</b> ${dados.nome}</p>
      <p><b>CPF:</b> ${dados.cpf}</p>
      <p><b>Mês:</b> ${dados.mes}</p>
      <p><b>Valor:</b> R$ ${Number(dados.valor).toFixed(2)}</p>

      <hr>

      <p style="text-align:center;">
        Recebemos o valor acima referente à mensalidade.
      </p>

      <p style="text-align:center; margin-top:20px;">
        ${new Date().toLocaleDateString("pt-BR")}
      </p>

    </div>

  `;
}


/* =============== GERAR RECIBO =============== */
function gerarRecibo(c, numero){

  const nome = c[1];

  const cpf = maskCPF(
    String(c[2]).padStart(11,"0")
  );

  const mes = formatarMes(
    String(c[3]).substring(0,7)
  );

  const valor =
    Number(c[4] || 0).toFixed(2);

  const data =
    new Date().toLocaleDateString("pt-BR");

  const html = `

    <html>

      <head>

        <title>Recibo</title>

        <style>

          body{
            font-family:Arial;
            padding:30px;
            text-align:center;
          }

          .box{
            border:2px solid #000;
            padding:20px;
            border-radius:10px;
            max-width:500px;
            margin:auto;
          }

          h2{
            margin-bottom:10px;
          }

          .numero{
            font-size:14px;
            margin-bottom:15px;
          }

          .linha{
            margin:10px 0;
            font-size:16px;
          }

        </style>

      </head>

      <body>

        <div class="box">

          <h2>RECIBO DE PAGAMENTO</h2>

          <div class="numero">
            <b>Nº:</b> ${numero}
          </div>

          <img
            src="https://github.com/vilafloresta2-creator/cadastro/blob/main/logo.png?raw=true"
            style="height:80px;margin-bottom:15px;">

          <div class="linha">
            <b>Recebemos de:</b> ${nome}
          </div>

          <div class="linha">
            <b>CPF:</b> ${cpf}
          </div>

          <div class="linha">
            <b>Referente:</b> ${mes}
          </div>

          <div class="linha">
            <b>Valor:</b> R$ ${valor}
          </div>

          <div class="linha">
            <b>Data:</b> ${data}
          </div>

          <br><br>

          ___________________________
          <br>

          Assinatura

        </div>

        <script>

          window.onload = function(){
            window.print();
          }

        </script>

      </body>

    </html>

  `;

  const w = window.open("", "_blank");

  w.document.write(html);
  w.document.close();
}


/* ================ REIMPRIMIR ================ */
function reimprimir(numero){

  if(!numero){

    alert("Recibo sem número");
    return;
  }

  const rec = recibos.find(r =>
    String(r[1]).trim() === String(numero).trim()
  );

  if(!rec){

    alert("Recibo não encontrado");
    return;
  }

  const nome = rec[2];

  const cpf =
    String(rec[3]).padStart(11,"0");

  const mes = rec[4];

  const valor =
    Number(rec[5] || 0).toFixed(2);

  gerarRecibo(
    [0, nome, cpf, mes, valor],
    numero
  );
}


/* ========= REIMPRIMIR POR COBRANÇA ========= */
function reimprimirPorCobranca(id){

  const c = cobrancas.find(x =>
    String(x[0]) === String(id)
  );

  if(!c){

    alert("Cobrança não encontrada");
    return;
  }

  const numero = c[7];

  if(!numero){

    alert("Recibo não gerado ainda");
    return;
  }

  reimprimir(numero);
}