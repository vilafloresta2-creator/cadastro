/* ================= LISTAR RECIBOS ================= */
function listarRecibos(){

  const buscaInput = document.getElementById("buscaRecibo");
  const busca = (buscaInput?.value || "").toLowerCase();

  const filtroMesEl = document.getElementById("filtroMesRecibo");
  const mes = filtroMesEl ? filtroMesEl.value : "";

  let lista = [...recibos];

  if(busca){
    lista = lista.filter(r => String(r[2]).toLowerCase().includes(busca));
  }

  if(mes){
    lista = lista.filter(r => r[4] == mes);
  }

  let html = "";

  [...lista].reverse().forEach(r => {

    const numero = r[1];
    const nome = r[2];
    const valor = Number(r[5]).toFixed(2);
    const data = formatarData(r[6]);

    html += `
      <div class="card" style="display:flex;justify-content:space-between;align-items:center;">
        
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
          style="font-size:12px;padding:6px 10px;"
          onclick="reimprimir('${numero}')"
          class="btn-recibo">
          🧾 Reimprimir
        </button>

      </div>
    `;
  });

  document.getElementById("listaRecibos").innerHTML = html;
}

/*=========== GERAR RECIBOS =================*/
function gerarHTMLRecibo(dados){

  return `
  <div style="font-family:Arial; max-width:400px; padding:20px; border:1px solid #ccc; border-radius:10px;">

    <div style="text-align:center;">
      <img src="https://github.com/vilafloresta2-creator/cadastro/blob/main/logo.png?raw=true" style="height:70px;"><br>
      <b style="font-size:18px;">Vila Floresta 2</b>
    </div>

    <hr>

    <h3 style="text-align:center;">RECIBO</h3>

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

function gerarRecibo(c, numero){

  const nome = c[1];
  const cpf = c[2];
  const mes = formatarMes(
    String(c[3]).substring(0,7)
  );
  const valor = Number(c[4]).toFixed(2);
  const data = new Date().toLocaleDateString("pt-BR");

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

        <div class="numero"><b>Nº:</b> ${numero}</div>

        <img src="https://github.com/vilafloresta2-creator/cadastro/blob/main/logo.png?raw=true" 
             style="height:80px;margin-bottom:15px;"><br>

        <div class="linha"><b>Recebemos de:</b> ${nome}</div>
        <div class="linha"><b>CPF:</b> ${cpf}</div>
        <div class="linha"><b>Referente:</b> ${mes}</div>
        <div class="linha"><b>Valor:</b> R$ ${valor}</div>
        <div class="linha"><b>Data:</b> ${data}</div>

        <br><br>

        ___________________________<br>
        Assinatura

      </div>

      <scr` + `ipt>
        window.onload = function(){
          window.print();
        }
      </scr` + `ipt>

    </body>
    </html>
  `;

  const w = window.open("", "_blank");
  w.document.write(html);
  w.document.close();
}

function reimprimir(numero){

  if(!numero){
    alert("Recibo sem número");
    return;
  }

  const rec = recibos.find(r => String(r[1]).trim() === String(numero).trim());

  if(!rec){
    alert("Recibo não encontrado");
    return;
  }

  const nome = rec[2];
  const cpf = String(rec[3]).padStart(11,"0"); // 🔥 garante zero
  const mes = rec[4];
  const valor = Number(rec[5]).toFixed(2);

  gerarRecibo([0, nome, cpf, mes, valor], numero);
}

function reimprimirPorCobranca(id){

  const c = cobrancas.find(x => String(x[0]) === String(id));

  if(!c){
    alert("Cobrança não encontrada");
    return;
  }

  const numero = c[7]; // coluna onde salvou o recibo

  if(!numero){
    alert("Recibo não gerado ainda");
    return;
  }

  reimprimir(numero);
}