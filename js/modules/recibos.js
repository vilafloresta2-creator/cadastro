/* =========================================
   RECIBOS
========================================= */


/* ============= RENDER RECIBOS ============= */
function renderRecibos(){

  const lista =
    safeArray(state.recibos)
      .slice()
      .reverse();

  let html = `

    <div class="card">

      <h3>
        Recibos Emitidos
      </h3>

    </div>

  `;

  if(!lista.length){

    html += `

      <div class="card">

        Nenhum recibo encontrado.

      </div>

    `;

    tela.innerHTML = html;

    return;
  }

  lista.forEach(r => {

    if(!r || !r.length){
      return;
    }

    const numero =
      String(r[1] || "")
        .trim();

    const nome =
      String(r[2] || "")
        .trim();

    const mes =
      formatarMes(r[4]);

    const valor =
      numero(r[5]);

    const data =
      formatarData(r[6]);

    html += `

      <div
        class="card"
        style="
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:10px;
          flex-wrap:wrap;
        "
      >

        <div>

          <div style="
            font-size:16px;
            font-weight:600;
          ">

            ${nome}

          </div>

          <div style="
            font-size:13px;
            opacity:.7;
            margin-top:4px;
          ">

            ${numero}

          </div>

          <div style="
            font-size:12px;
            opacity:.7;
            margin-top:4px;
          ">

            ${mes} • ${data}

          </div>

        </div>

        <div style="
          display:flex;
          align-items:center;
          gap:10px;
        ">

          <div style="
            font-weight:bold;
            color:#22c55e;
          ">

            ${moeda(valor)}

          </div>

          <button
            class="btn-recibo"
            onclick="reimprimir('${numero}')"
          >

            🧾 Reimprimir

          </button>

        </div>

      </div>

    `;
  });

  tela.innerHTML = html;
}


/* =============== GERAR RECIBO =============== */
function gerarRecibo(cobranca, numeroRecibo){

  if(
    !cobranca
    ||
    !Array.isArray(cobranca)
  ){

    showToast(
      "Dados do recibo inválidos",
      "error"
    );

    return;
  }

  const nome =

    String(cobranca[1] || "")
      .trim();

  const cpf =

    maskCPF(
      limparCPF(cobranca[2])
    );

  const mes =

    formatarMes(

      String(cobranca[3] || "")
        .substring(0,7)

    );

  const valor =
    numero(cobranca[4]);

  const data =

    new Date()
      .toLocaleDateString(
        "pt-BR"
      );

  const html = `

    <html>

      <head>

        <title>
          Recibo
        </title>

        <style>

          body{

            font-family:Arial;
            padding:30px;
            text-align:center;
            background:#fff;
            color:#000;

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

          .assinatura{
            margin-top:40px;
          }

          img{
            max-width:100%;
          }

        </style>

      </head>

      <body>

        <div class="box">

          <h2>

            RECIBO DE PAGAMENTO

          </h2>

          <div class="numero">

            <b>Nº:</b>

            ${numeroRecibo}

          </div>

          <img
            src="https://github.com/vilafloresta2-creator/cadastro/blob/main/logo.png?raw=true"

            alt="Logo"

            style="
              height:80px;
              margin-bottom:15px;
            "
          >

          <div class="linha">

            <b>Recebemos de:</b>

            ${nome || "-"}

          </div>

          <div class="linha">

            <b>CPF:</b>

            ${cpf}

          </div>

          <div class="linha">

            <b>Referente:</b>

            ${mes}

          </div>

          <div class="linha">

            <b>Valor:</b>

            ${moeda(valor)}

          </div>

          <div class="linha">

            <b>Data:</b>

            ${data}

          </div>

          <div class="assinatura">

            ___________________________

            <br>

            Assinatura

          </div>

        </div>

        <script>

          window.onload = function(){

            window.print();

          };

        </script>

      </body>

    </html>

  `;

  const janela =
    window.open(
      "",
      "_blank"
    );

  if(!janela){

    showToast(
      "Permita popups para imprimir recibos",
      "error"
    );

    return;
  }

  janela.document.write(html);

  janela.document.close();
}


/* ================ REIMPRIMIR ================ */
function reimprimir(numeroRecibo){

  if(!numeroRecibo){

    showToast(
      "Recibo sem número",
      "error"
    );

    return;
  }

  const recibo =

    safeArray(state.recibos)
      .find(r =>

        String(r[1] || "")
          .trim()

          ===

        String(numeroRecibo)
          .trim()

      );

  if(!recibo){

    showToast(
      "Recibo não encontrado",
      "error"
    );

    return;
  }

  const nome =

    String(recibo[2] || "")
      .trim();

  const cpf =
    limparCPF(recibo[3]);

  const mes =

    String(recibo[4] || "")
      .trim();

  const valor =
    numero(recibo[5]);

  gerarRecibo(

    [
      0,
      nome,
      cpf,
      mes,
      valor
    ],

    numeroRecibo

  );
}


/* ========= REIMPRIMIR POR COBRANÇA ========= */
function reimprimirPorCobranca(id){

  const cobranca =

    safeArray(state.cobrancas)
      .find(item =>

        String(item[0])
          === String(id)

      );

  if(!cobranca){

    showToast(
      "Cobrança não encontrada",
      "error"
    );

    return;
  }

  const numeroRecibo =

    String(cobranca[7] || "")
      .trim();

  if(!numeroRecibo){

    showToast(
      "Recibo não gerado ainda",
      "error"
    );

    return;
  }

  reimprimir(
    numeroRecibo
  );
}