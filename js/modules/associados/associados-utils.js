/* -----------------------------------------
          ASSOCIADOS UTILS
----------------------------------------- */

/* ========== STATUS ASSOCIADO ========== */
function statusFinanceiroAssociado(cpf){

  const cpfLimpo =
    limparCPF(cpf);

  const possuiDebito =

    safeArray(state.cobrancas)

      .map(cobrancaObj)

      .some(c => {

        return (

          limparCPF(c.cpf) === cpfLimpo

          &&

          normalizarTexto(c.status)
            .toLowerCase()

          !==

          "pago"

        );

      });

  return possuiDebito
    ? "Devedor"
    : "Regular";
}