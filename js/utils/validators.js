/* =========================================
   VALIDATORS
========================================= */


/* ========== CPF ========== */
function validarCPF(cpf){

  const texto =
    limparCPF(cpf);

  if(
    texto.length !== 11
  ){
    return false;
  }

  /* =========================================
     CPF REPETIDO
  ========================================= */

  if(
    /^(\d)\1+$/
      .test(texto)
  ){
    return false;
  }

  let soma = 0;
  let resto = 0;


  /* =========================================
     PRIMEIRO DIGITO
  ========================================= */

  for(let i = 1; i <= 9; i++){

    soma +=

      Number(texto[i - 1])

      *

      (11 - i);
  }

  resto =
    (soma * 10) % 11;

  if(
    resto === 10
    ||
    resto === 11
  ){
    resto = 0;
  }

  if(
    resto !==
    Number(texto[9])
  ){
    return false;
  }


  /* =========================================
     SEGUNDO DIGITO
  ========================================= */

  soma = 0;

  for(let i = 1; i <= 10; i++){

    soma +=

      Number(texto[i - 1])

      *

      (12 - i);
  }

  resto =
    (soma * 10) % 11;

  if(
    resto === 10
    ||
    resto === 11
  ){
    resto = 0;
  }

  return (

    resto ===
    Number(texto[10])

  );
}


/* ========== EMAIL ========== */
function validarEmail(email){

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    .test(

      String(email || "")
        .trim()

    );
}


/* ========== TELEFONE ========== */
function validarTelefone(telefone){

  const texto =

    String(telefone || "")
      .replace(/\D/g,'');

  return (
    texto.length >= 10
  );
}


/* ========== LIMPAR ERROS ========== */
function limparErrosCampos(){

  document

    .querySelectorAll(".input-erro")

    .forEach(el => {

      el.classList.remove(
        "input-erro"
      );

    });
}


/* ========== MARCAR ERRO ========== */
function marcarErro(campo){

  if(!campo){
    return;
  }

  campo.classList.add(
    "input-erro"
  );
}


/* ========== VALIDAR CAMPOS ========== */
function validarCampos(){

  limparErrosCampos();

  const nome =
    document.getElementById(
      "m_nome"
    );

  const cpf =
    document.getElementById(
      "m_cpf"
    );

  const mensalidade =
    document.getElementById(
      "m_mensal"
    );

  let valido = true;

  /* =========================================
     NOME
  ========================================= */

  if(
    !nome?.value.trim()
  ){

    marcarErro(nome);

    valido = false;
  }

  /* =========================================
     CPF
  ========================================= */

  if(
    !cpf?.value.trim()
    ||
    !validarCPF(cpf.value)
  ){

    marcarErro(cpf);

    valido = false;
  }

  /* =========================================
     MENSALIDADE
  ========================================= */

  if(
    !valorPositivo(
      mensalidade?.value
    )
  ){

    marcarErro(mensalidade);

    valido = false;
  }

  return valido;
}