/* ----------------------------------------------
              FIXAS FORM
---------------------------------------------- */


/* ========== LIMPAR FORM ========== */
function limparFixasForm(){

  setValue(
    "fx_categoria",
    ""
  );

  setValue(
    "fx_descricao",
    ""
  );

  setValue(
    "fx_valor",
    ""
  );

  setValue(
    "fx_dia",
    ""
  );

  state.editandoFixaId = null;

}


/* ========== PREENCHER FORM ========== */
function preencherFixaForm(fixa){

  if(!fixa){
    return;
  }

  setValue(
    "fx_categoria",
    fixa.categoria || ""
  );

  setValue(
    "fx_descricao",
    fixa.descricao || ""
  );

  setValue(
    "fx_valor",
    fixa.valor || ""
  );

  setValue(
    "fx_dia",
    fixa.dia || ""
  );

}


/* ========== OBTER DADOS ========== */
function obterDadosFixaForm(){

  return {

    id:
      state.editandoFixaId || "",

    categoria:
      getValue(
        "fx_categoria"
      ).trim(),

    descricao:
      getValue(
        "fx_descricao"
      ).trim(),

    valor:
      numero(
        getValue(
          "fx_valor"
        )
      ),

    dia:
      numero(
        getValue(
          "fx_dia"
        )
      )

  };

}


/* ========== SALVAR ========== */
async function salvarFixasForm(){

  const dados =
    obterDadosFixaForm();

  if(
    !dados.categoria ||
    !dados.descricao ||
    !valorPositivo(
      dados.valor
    )
  ){

    showToast(
      "Preencha os campos corretamente",
      "warning"
    );

    return;
  }


  if(
    dados.dia < 1 ||
    dados.dia > 31
  ){

    showToast(
      "Dia inválido",
      "warning"
    );

    return;
  }


  const editando =
    !!state.editandoFixaId;


  const ok =
    await salvarFixaAPI(
      dados,
      editando
    );


  if(!ok){
    return;
  }


  limparFixasForm();

  limparModalPrincipal();

  await carregar();

  renderFixas();

}