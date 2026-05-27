/* =========================================
   DOM HELPERS
========================================= */


/* ========== GET ELEMENT ========== */
function getEl(id){

  return document.getElementById(id);
}


/* ========== GET VALUE ========== */
function getValue(id){

  return getEl(id)?.value || "";
}


/* ========== SET VALUE ========== */
function setValue(id, valor){

  const el =
    getEl(id);

  if(!el){
    return;
  }

  el.value = valor;
}


/* ========== SET HTML ========== */
function setHTML(id, html){

  const el =
    getEl(id);

  if(!el){
    return;
  }

  el.innerHTML = html;
}


/* ========== SET TEXT ========== */
function setText(id, texto){

  const el =
    getEl(id);

  if(!el){
    return;
  }

  el.innerText = texto;
}


/* ========== SHOW ELEMENT ========== */
function showEl(id){

  const el =
    getEl(id);

  if(!el){
    return;
  }

  el.style.display = "";
}


/* ========== HIDE ELEMENT ========== */
function hideEl(id){

  const el =
    getEl(id);

  if(!el){
    return;
  }

  el.style.display = "none";
}