/* =========================================
   ASSOCIADOS STATUS
========================================= */


/* ========== STATUS ASSOCIADO ========== */
function statusAssociado(cpf){

  const cobrancas =
    safeArray(state.cobrancas);

  const cpfLimpo =

    String(cpf || "")

      .replace(/\D/g,"");

  const possuiDebito =

    cobrancas.some(c => {

      const cpfCobranca =

        String(c[2] || "")

          .replace(/\D/g,"");

      const status =

        normalizarTexto(c[5])

          .toLowerCase();

      return (

        cpfCobranca === cpfLimpo

        &&

        status !== "pago"

      );
    });

  return possuiDebito
    ? "Devedor"
    : "Regular";
}