/* ==================== GERAR RELATORIOS ================*/
function gerarRelatorioMensal(){

  const mes =
    document.getElementById("mesRelatorio").value;

  if(!mes){
    alert("Informe o mês");
    return;
  }

  let entradas = 0;
  let saidas = 0;

  let categorias = {};

  caixa.forEach(c => {

    if(!c[1]) return;

    const d = new Date(c[1]);

    const mesLinha =
      String(d.getMonth()+1).padStart(2,"0")
      + "-"
      + d.getFullYear();

    if(mesLinha !== mes){
      return;
    }

    const tipo =
      String(c[2]).trim();

    const categoria =
      String(c[3]).trim();

    const valor =
      Number(c[5]) || 0;

    if(tipo === "Entrada"){
      entradas += valor;
    }

    if(
      tipo === "Saída"
      || tipo === "Saida"
    ){

      saidas += valor;

      if(!categorias[categoria]){
        categorias[categoria] = 0;
      }

      categorias[categoria] += valor;
    }

  });

  let inadimplencia = 0;

  cobrancas.forEach(c => {

    if(
      String(c[3]).trim() === mes
      && String(c[5]).trim() === "Pendente"
    ){

      inadimplencia += Number(c[4]) || 0;
    }

  });

  const saldo = entradas - saidas;

  let htmlCategorias = "";

  Object.keys(categorias).forEach(cat => {

    htmlCategorias += `
      <div style="
        display:flex;
        justify-content:space-between;
        margin-top:5px;
      ">
        <span>${cat}</span>
        <b>R$ ${categorias[cat].toFixed(2)}</b>
      </div>
    `;
  });

  document.getElementById("resultadoRelatorio")
    .innerHTML = `

    <div class="card" style="margin-top:15px;">

      <h2>
        Relatório ${mes}
      </h2>

      <hr>

      <p>
        <b>Entradas:</b>
        R$ ${entradas.toFixed(2)}
      </p>

      <p>
        <b>Saídas:</b>
        R$ ${saidas.toFixed(2)}
      </p>

      <p>
        <b>Saldo Final:</b>
        R$ ${saldo.toFixed(2)}
      </p>

      <p>
        <b>Inadimplência:</b>
        R$ ${inadimplencia.toFixed(2)}
      </p>

      <hr>

      <h3>Despesas por Categoria</h3>

      ${htmlCategorias || "Nenhuma despesa"}

    </div>

  `;
}