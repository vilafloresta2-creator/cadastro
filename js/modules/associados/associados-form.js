/* ---------------------------------------------- 
              ASSOCIADOS FORM
 ---------------------------------------------- */

/* ========== LIMPAR FORM ========== */
function limparAssociadoForm(){

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

function preencherAssociadoForm(
  associado
){

  if(!associado){
    return;
  }

  setValue(
    "m_nome",
    associado.nome || ""
  );

  setValue(
    "m_cpf",
    maskCPF(
      associado.cpf
    )
  );

  setValue(
    "m_tel",
    associado.telefone || ""
  );

  setValue(
    "m_email",
    associado.email || ""
  );

  setValue(
    "m_endereco",
    associado.endereco || ""
  );

  setValue(
    "m_mensal",
    numero(
      associado.mensalidade
    )
  );

  setValue(
    "m_status",
    associado.status || "Ativo"
  );
}


/* ========== OBTER DADOS FORM ========== */
function obterDadosAssociadoForm(){

  return {

    id:
      state.editandoId,

    nome:
      getValue("m_nome").trim(),

    cpf:
      limparCPF(
        getValue("m_cpf")
      ),

    telefone:
      getValue("m_tel")
        .replace(/\D/g,""),

    email:
      getValue("m_email").trim(),

    endereco:
      getValue("m_endereco").trim(),

    mensalidade:
      numero(
        getValue("m_mensal")
      ),

    status:
      getValue("m_status") || "Ativo"
  };
}


/* ========== SALVAR MODAL ========== */
async function salvarAssociadoModal(){

  if(!validarCamposAssociado()){

    showToast(
      "Preencha corretamente",
      "warning"
    );

    return;
  }

  /* =====================================
      VALIDAR TELEFONE DUPLICADO
  ===================================== */

  const telefone =

    getValue("m_tel")
      .replace(/\D/g,"");

  const existe =

    state.associados.some(a =>

      String(a.telefone || "")
        .replace(/\D/g,"")

      ===

      telefone

      &&

      String(a.id)
        !==
      String(state.editandoId)

    );

  if(existe){

    showToast(
      "Telefone já cadastrado",
      "warning"
    );

    return;
  }

  const editando =
    !!state.editandoId;

  const dados =
    obterDadosAssociadoForm();

  const btn =
    getEl("btnSalvar");

  if(btn){

    btn.disabled = true;

    btn.innerText =
      "Salvando...";
  }

  try{

    const resp =
      await salvarAssociadoAPI(
        dados,
        editando
      );

    if(!resp){
      return;
    }

    limparModalPrincipal();

    await carregar();

    renderAssociados();

  }finally{

    if(btn){

      btn.disabled = false;

      btn.innerText =
        "Salvar";
    }
  }
}