/* ---------------------------------------------- 
             ASSOCIADOS VALIDATORS
 ---------------------------------------------- */

/* ========== LIMPAR ERROS ========== */
function limparErrosCampos(){

  const campos =

    document.querySelectorAll(
      ".input-erro"
    );

  campos.forEach(campo => {

    campo.classList.remove(
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
function validarCamposAssociado(){

  limparErrosCampos();

  const nome =
    getEl("m_nome");

  const cpf =
    getEl("m_cpf");

  const telefone =
    getEl("m_tel");

  const mensalidade =
    getEl("m_mensal");

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
                  TELEFONE
  ========================================= */

  if(
    !telefone?.value.trim()
    ||
    !validarTelefone(telefone.value)
    
  ){

    marcarErro(telefone);

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