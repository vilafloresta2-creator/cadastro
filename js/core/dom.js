/* ----------------------------------------
              DOM HELPERS
---------------------------------------- */


/* ========== GET ELEMENT ========== */
function getEl(id){

  return document.getElementById(id);

}


/* ========== GET VALUE ========== */
function getValue(id){

  const el =
    getEl(id);

  return el
    ? el.value
    : "";

}


/* ========== SET VALUE ========== */
function setValue(id, valor){

  const el =
    getEl(id);

  if(!el){
    return;
  }

  el.value =
    valor ?? "";

}


/* ========== SET HTML ========== */
function setHTML(id, html){

  const el =
    getEl(id);

  if(!el){
    return;
  }

  el.innerHTML =
    html;

}


/* ========== SET TEXT ========== */
function setText(id, texto){

  const el =
    getEl(id);

  if(!el){
    return;
  }

  el.innerText =
    texto;

}


/* ========== SHOW ========== */
function showEl(id){

  const el =
    getEl(id);

  if(!el){
    return;
  }

  el.style.display =
    "";

}


/* ========== HIDE ========== */
function hideEl(id){

  const el =
    getEl(id);

  if(!el){
    return;
  }

  el.style.display =
    "none";

}


/* ========== FOCUS ========== */
function focusInput(id){

  const el =
    getEl(id);

  if(!el){
    return;
  }

  el.focus();

}


/* ========== DISABLED ========== */
function setDisabled(
  id,
  disabled = true
){

  const el =
    getEl(id);

  if(!el){
    return;
  }

  el.disabled =
    disabled;

}