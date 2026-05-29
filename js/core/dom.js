/* =========================================
   DOM HELPERS
========================================= */


/* ========== GET ELEMENT ========== */
function getEl(id){

  return document.getElementById(id);
}


/* ========== GET VALUE ========== */
function getValue(id){

  const el = getEl(id);

  return el ? el.value : "";
}


/* ========== SET VALUE ========== */
function setValue(id, valor){

  const el = getEl(id);

  if(el){

    el.value = valor ?? "";
  }
}


/* ========== SET HTML ========== */
function setHTML(id, html){

  const el = getEl(id);

  if(el){

    el.innerHTML = html;
  }
}


/* ========== SET TEXT ========== */
function setText(id, texto){

  const el = getEl(id);

  if(el){

    el.innerText = texto;
  }
}


/* ========== SHOW ELEMENT ========== */
function showEl(id){

  const el = getEl(id);

  if(el){

    el.style.display = "";
  }
}


/* ========== HIDE ELEMENT ========== */
function hideEl(id){

  const el = getEl(id);

  if(el){

    el.style.display = "none";
  }
}