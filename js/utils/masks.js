/* ----------------------------------------------
                  MASKS
---------------------------------------------- */


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

  let telefoneLimpo =

    String(telefone || "")

      .replace(/\D/g, "")

      .substring(0, 11);


  /* ===============================
              VAZIO
  =============================== */

  if(!telefoneLimpo){

    return "";

  }


  /* ===============================
          ATÉ 10 DÍGITOS
  =============================== */

  if(telefoneLimpo.length <= 10){

    if(
      telefoneLimpo.length <= 2
    ){

      return telefoneLimpo;

    }

    if(
      telefoneLimpo.length <= 6
    ){

      return telefoneLimpo.replace(

        /(\d{2})(\d{0,4})/,

        "($1) $2"

      );

    }

    return telefoneLimpo.replace(

      /(\d{2})(\d{4})(\d{0,4})/,

      "($1) $2-$3"

    );

  }


  /* ===============================
            CELULAR 11 DÍGITOS
  =============================== */

  return telefoneLimpo.replace(

    /(\d{2})(\d{5})(\d{0,4})/,

    "($1) $2-$3"

  );

}


/* ========== FORMATAR MOEDA INPUT ========== */
function maskMoeda(valor){

  const numeroLimpo =

    String(valor || "")

      .replace(/\D/g, "");


  const numeroFormatado =

    Number(numeroLimpo || 0) / 100;


  return numeroFormatado.toLocaleString(

    "pt-BR",

    {

      minimumFractionDigits:2,

      maximumFractionDigits:2

    }

  );

}