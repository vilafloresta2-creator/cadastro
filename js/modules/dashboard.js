function renderDashboard(){

  const hoje = new Date();

  const mesAtual =
    String(hoje.getMonth()+1).padStart(2,"0")
    + "-"
    + hoje.getFullYear();

  let entradas = 0;
  let saidas = 0;
  let inadimplencia = 0;
  let ativos = 0;

  caixa.forEach(c => {

    let mes = "";

    if(c[1]){

      const d = new Date(c[1]);

      mes =
        String(d.getMonth()+1).padStart(2,"0")
        + "-"
        + d.getFullYear();
    }

    if(mes !== mesAtual){
      return;
    }

    const tipo = String(c[2]).trim();
    const valor = Number(c[5]) || 0;

    if(tipo === "Entrada"){
      entradas += valor;
    }

    if(tipo === "Saída" || tipo === "Saida"){
      saidas += valor;
    }

  });

  cobrancas.forEach(c => {

    if(String(c[5]).trim() === "Pendente"){
      inadimplencia += Number(c[4]) || 0;
    }

  });

  associados.forEach(a => {

    const status =
      String(a[7] || "Ativo").trim();

    if(status === "Ativo"){
      ativos++;
    }

  });

  const saldo = entradas - saidas;

  tela.innerHTML = `

    <div class="top">

      <div class="box">
        <b>Entradas</b><br>
        <span style="color:#22c55e;">
          R$ ${entradas.toFixed(2)}
        </span>
      </div>

      <div class="box">
        <b>Saídas</b><br>
        <span style="color:#ef4444;">
          R$ ${saidas.toFixed(2)}
        </span>
      </div>

      <div class="box">
        <b>Saldo</b><br>
        <span>
          R$ ${saldo.toFixed(2)}
        </span>
      </div>

      <div class="box">
        <b>Inadimplência</b><br>
        <span style="color:#f59e0b;">
          R$ ${inadimplencia.toFixed(2)}
        </span>
      </div>

      <div class="box">
        <b>Associados Ativos</b><br>
        <span>
          ${ativos}
        </span>
      </div>

    </div>

  `;
}