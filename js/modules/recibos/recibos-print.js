/* ----------------------------------------------
                  RECIBOS PRINT
---------------------------------------------- */

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
      .find(r => {

        const item =
          reciboObj(r);

        return (

          String(item.numero)
            .trim()

          ===

          String(numeroRecibo)
            .trim()
        );

      });

  if(!recibo){

    showToast(
      "Recibo não encontrado",
      "error"
    );

    return;
  }

  const item =
    reciboObj(recibo);

  const nome =
    String(item.nome)
      .trim();

  const cpf =
    limparCPF(item.cpf);

  const mes =
    String(item.mes)
      .trim();

  const valor =
    item.valor;

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
      .find(item => {

        const c =
          cobrancaObj(item);

        return (
          String(c.id)
          ===
          String(id)
        );

      });

  if(!cobranca){

    showToast(
      "Cobrança não encontrada",
      "error"
    );

    return;
  }

  const numeroRecibo =
    String(
      cobrancaObj(cobranca).recibo
    ).trim();

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