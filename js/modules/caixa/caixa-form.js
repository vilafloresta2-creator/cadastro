/* ----------------------------------------------
                  CAIXA FORM
---------------------------------------------- */

/* ========== LIMPAR FORMULÁRIO ========== */
function limparFormularioCaixa(){

  const categoria =
    document.getElementById(
      "cx_categoria"
    );

  const descricao =
    document.getElementById(
      "cx_descricao"
    );

  const valor =
    document.getElementById(
      "cx_valor"
    );

  if(categoria){
    categoria.value = "";
  }

  if(descricao){
    descricao.value = "";
  }

  if(valor){
    valor.value = "";
  }
}


/* ========== OBTER DADOS ========== */
function obterDadosCaixaForm(){

  return {

    tipo:
      getValue("cx_tipo"),

    categoria:
      getValue("cx_categoria")
        .trim(),

    descricao:
      getValue("cx_descricao")
        .trim(),

    valor:
      numero(
        getValue("cx_valor")
      )
  };
}