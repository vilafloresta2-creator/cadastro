/* ============= STATUS ASSOCIADO ============= */
function statusAssociado(cpf){
  const pendente = cobrancas.some(c => c[2] == cpf && c[5] == "Pendente");
  return pendente ? "Devedor" : "Regular";
}

/* ================== JA GEROU ================*/
function jaGerouMesAtual(){

  const hoje = new Date();

  const mesAtual =
    hoje.getFullYear()
    + "-"
    + String(hoje.getMonth() + 1).padStart(2,"0");

  return cobrancas.some(c => {

    const mesCobranca = String(c[3])
      .trim()
      .substring(0,7);

    return mesCobranca === mesAtual;
  });
}