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

  state.editandoId = null;

  limparErrosCampos?.();
}


/* ========== PREENCHER FORM ========== */
function preencherFormularioAssociado(associado){

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
      value("m_nome").trim(),

    cpf:
      limparCPF(
        value("m_cpf")
      ),

    telefone:
      value("m_tel")
        .replace(/\D/g,""),

    email:
      value("m_email").trim(),

    endereco:
      value("m_endereco").trim(),

    mensalidade:
      numero(
        value("m_mensal")
      ),

    status:
      value("m_status") || "Ativo"
  };
}

/* ========== SALVAR MODAL ========== */
async function salvarModal(){

  if(!validarCampos()){

    showToast(
      "Preencha corretamente",
      "warning"
    );

    return;
  }

  const editando =
    !!state.editandoId;

  const dados =
    obterDadosFormularioAssociado();

  const btn =
    getEl("btnSalvar");

  if(btn){

    btn.disabled = true;

    btn.innerText =
      "Salvando...";
  }

  try{

    const resp =
      await salvarAssociado(
        dados,
        editando
      );

    if(!resp){
      return;
    }

    fecharModal();

    await carregar();

  }finally{

    if(btn){

      btn.disabled = false;

      btn.innerText =
        "Salvar";
    }
  }
}