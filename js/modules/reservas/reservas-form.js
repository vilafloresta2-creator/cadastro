/* ---------------------------------------------- 
              RESERVA FORM
 ---------------------------------------------- */

/* ================= SALVAR ================= */
async function salvarReservaForm(id){

  const dados =
    obterDadosReservaForm();

     dados.id = id;     

  limparErrosCampos();

  let valido = true;

  const nome =
    getEl("frm_nome");

  const telefone =
    getEl("frm_telefone");

  const espaco =
    getEl("frm_espaco");

  const data =
    getEl("frm_data");

  const hora =
    getEl("frm_hora");

  const valor =
    getEl("frm_valor");  

  if(!nome?.value.trim()){

    marcarErro(nome);

    valido = false;
  }

  if(!telefone?.value.trim()){

    marcarErro(telefone);

    valido = false;
  }

  if(!espaco?.value.trim()){

    marcarErro(espaco);

    valido = false;
  }

  if(!data?.value){

    marcarErro(data);

    valido = false;
  }

  if(!hora?.value){

    marcarErro(hora);

    valido = false;
  }

  if(!valor?.value){

    marcarErro(valor);

    valido = false;
  }

  if(!valido){

    showToast(
      "Preencha os campos obrigatórios",
      "warning"
    );

    return;
  }

    const ok =
    await salvarReservaAPI(

      dados,

      !!id

    );

  if(!ok){
    return;
  }

  closeModal("modal");

  await carregar();

  if(
    state.telaAtual === "agenda"
  ){

    renderAgenda();

  }else{

    renderReservas();

  }
/*try{

    showLoading(
      "Salvando reserva..."
    );

    const resp =
      await postAPI({

        acao:"salvar_reserva",

        ...dados
      });

    if(resp.erro){

      showToast(
        resp.erro,
        "error"
      );

      return;
    }

    closeModal("modal");

    await carregar();

    if(
      state.telaAtual === "agenda"
    ){

      renderAgenda();

    }else{

      renderReservas();
    }

    showToast(
      id
        ? "Reserva atualizada"
        : "Reserva criada",
      "success"
    );

  }catch(error){

    console.error(error);

    showToast(
      "Erro ao salvar",
      "error"
    );

  }finally{

    hideLoading();
  }*/
}


/* ================= LIMPAR ================= */
function limparReservaForm(){

  setValue(
    "frm_nome",
    ""
  );

  setValue(
    "frm_telefone",
    ""
  );

  setValue(
    "frm_espaco",
    ""
  );

  setValue(
    "frm_data",
    ""
  );

  setValue(
    "frm_hora",
    ""
  );

  setValue(
    "frm_valor",
    ""
  );

  setValue(
    "frm_obs",
    ""
  );

  setValue(
    "frm_associado",
    ""
  );

}


/* ================= OBTER DADOS ================= */
function obterDadosReservaForm(){

  return {

    associadoId:
      getEl("frm_associado")?.value || "",

    nome:
      getEl("frm_nome")?.value?.trim(),

    telefone:
      getEl("frm_telefone")?.value?.trim(),

    espaco:
      getEl("frm_espaco")?.value?.trim(),

    data:
      getEl("frm_data")?.value,

    hora:
      getEl("frm_hora")?.value,

    valor:
      numero(
        getEl("frm_valor")?.value
      ),

    observacao:
      getEl("frm_obs")?.value?.trim()
  };
}


/* ================= PREENCHER ================= */
function preencherReservaForm(reserva){

  if(!reserva){
    return;
  }

  setValue(
    "frm_associado",
    reserva.associadoId || ""
  );

  setValue(
    "frm_nome",
    reserva.nome || ""
  );

  setValue(
    "frm_telefone",
    reserva.telefone || ""
  );

  setValue(
    "frm_espaco",
    reserva.espaco || ""
  );

  setValue(
    "frm_data",
    reserva.data || ""
  );

  setValue(
    "frm_hora",
    reserva.hora || ""
  );

  setValue(
    "frm_valor",
    reserva.valor || ""
  );

  setValue(
    "frm_obs",
    reserva.observacao || ""
  );
}