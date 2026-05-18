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

  if(cpfLimpo.length !== 11){
    return cpfLimpo;
  }

  return cpfLimpo.replace(

    /(\d{3})(\d{3})(\d{3})(\d{2})/,

    "$1.$2.$3-$4"

  );
}