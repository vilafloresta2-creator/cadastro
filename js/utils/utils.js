/* ================= UTILS ================= */


/* ========== TEXTO ========== */
function normalizarTexto(v){

  return String(v || "")
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}


/* ========== NUMERO ========== */
function numero(v){

  return Number(v) || 0;
}


/* ========== MOEDA ========== */
function moeda(v){

  return "R$ " + numero(v).toFixed(2);
}


/* ========== ARRAY SEGURO ========== */
function safeArray(v){

  return Array.isArray(v)
    ? v
    : [];
}


/* ========== DATA VALIDA ========== */
function dataValida(v){

  const d = new Date(v);

  return !isNaN(d);
}


/* ========== OBTER MES ========== */
function obterMes(data){

  if(!data){
    return "";
  }

  const d = new Date(data);

  if(isNaN(d)){
    return "";
  }

  return (
    String(d.getMonth() + 1)
      .padStart(2,"0")
    +
    "-"
    +
    d.getFullYear()
  );
}


/* ========== ENTRADA ========== */
function isEntrada(tipo){

  return (
    normalizarTexto(tipo)
      .toLowerCase()
    ===
    "entrada"
  );
}


/* ========== SAIDA ========== */
function isSaida(tipo){

  return (
    normalizarTexto(tipo)
      .toLowerCase()
    ===
    "saida"
  );
}


/* ========== TIPO CAIXA ========== */
function tipoCaixa(tipo){

  if(isEntrada(tipo)){
    return "Entrada";
  }

  if(isSaida(tipo)){
    return "Saida";
  }

  return "";
}


/* ========== CPF LIMPO ========== */
function limparCPF(cpf){

  return String(cpf || "")
    .replace(/^'/,'')
    .replace(/\D/g,'')
    .padStart(11,"0");
}


/* ========== CPF FORMATADO ========== */
function maskCPF(cpf){

  cpf = limparCPF(cpf);

  return cpf.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    "$1.$2.$3-$4"
  );
}


/* ========== VALOR POSITIVO ========== */
function valorPositivo(v){

  return numero(v) > 0;
}


/* ============ LOADING GLOBAL ============ */
function showLoading(
  texto = "Carregando..."
){

  let el =
    document.getElementById(
      "globalLoading"
    );

  if(el){

    const txt =
      el.querySelector(".loading-text");

    if(txt){
      txt.innerText = texto;
    }

    el.classList.add("show");

    return;
  }

  const html = `

    <div
      id="globalLoading"
      class="loading-overlay show"
    >

      <div class="loading-box">

        <div class="loading-spinner"></div>

        <div class="loading-text">
          ${texto}
        </div>

      </div>

    </div>

  `;

  document.body.insertAdjacentHTML(
    "beforeend",
    html
  );
}


/* ============ HIDE LOADING ============ */
function hideLoading(){

  const el =
    document.getElementById(
      "globalLoading"
    );

  if(!el){
    return;
  }

  el.classList.remove("show");

  setTimeout(() => {
    el.remove();
  }, 200);
}