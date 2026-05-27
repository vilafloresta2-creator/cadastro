/* =========================================
   MASKS
========================================= */


/* ========== LIMPAR CPF ========== */
function limparCPF(cpf){

  return String(cpf || "")

    .replace(/^'/, "")

    .replace(/\D/g, "");
}


/* ========== FORMATAR CPF ========== */
function maskCPF(cpf){

  const cpfLimpo =
    limparCPF(cpf);

  if(
    cpfLimpo.length !== 11
  ){
    return cpfLimpo;
  }

  return cpfLimpo.replace(

    /(\d{3})(\d{3})(\d{3})(\d{2})/,

    "$1.$2.$3-$4"

  );
}


/* ========== FORMATAR TELEFONE ========== */
function maskTelefone(telefone){

  const telefoneLimpo =

    String(telefone || "")
      .replace(/\D/g,'');

  if(telefoneLimpo.length <= 10){

    return telefoneLimpo.replace(

      /(\d{2})(\d{4})(\d{0,4})/,

      "($1) $2-$3"

    );
  }

  return telefoneLimpo.replace(

    /(\d{2})(\d{5})(\d{0,4})/,

    "($1) $2-$3"

  );
}


/* ========== FORMATAR MOEDA INPUT ========== */
function maskMoeda(valor){

  const numeroLimpo =

    String(valor || "")

      .replace(/\D/g,'');

  const numeroFormatado =

    Number(numeroLimpo || 0) / 100;

  return numeroFormatado

    .toLocaleString(

      "pt-BR",

      {
        minimumFractionDigits:2,
        maximumFractionDigits:2
      }

    );
}