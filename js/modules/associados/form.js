/* =========================================
   ASSOCIADOS FORM
========================================= */


/* ========== LIMPAR FORM ========== */
function limparFormularioAssociado(){

  setValue("m_nome", "");
  setValue("m_cpf", "");
  setValue("m_tel", "");
  setValue("m_email", "");
  setValue("m_endereco", "");
  setValue("m_mensal", "");
  setValue("m_status", "Ativo");

  limparErrosCampos?.();
}


/* ========== PREENCHER FORM ========== */
function preencherFormularioAssociado(
  associado
){

  if(!associado){
    return;
  }

  setValue(
    "m_nome",
    String(associado[1] || "").trim()
  );

  setValue(
    "m_cpf",
    maskCPF(associado[2])
  );

  setValue(
    "m_tel",
    String(associado[3] || "").trim()
  );

  setValue(
    "m_email",
    String(associado[4] || "").trim()
  );

  setValue(
    "m_endereco",
    String(associado[5] || "").trim()
  );

  setValue(
    "m_mensal",
    numero(associado[6])
  );

  setValue(
    "m_status",
    associado[7] || "Ativo"
  );
}


/* ========== OBTER DADOS FORM ========== */
function obterDadosFormularioAssociado(){

  return {

    id:
      state.editandoId,

    nome:
      getValue("m_nome"),

    cpf:
      limparCPF(
        getValue("m_cpf")
      ),

    telefone:
      getValue("m_tel")
        .replace(/\D/g,""),

    email:
      getValue("m_email"),

    endereco:
      getValue("m_endereco"),

    mensalidade:
      numero(
        getValue("m_mensal")
      ),

    status:
      getValue("m_status") || "Ativo"
  };
}