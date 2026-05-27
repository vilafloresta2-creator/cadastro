/* =========================================
   MODAL CORE
========================================= */


/* ========== OPEN MODAL ========== */
function openModal(id){

  const modal =
    getEl(id);

  if(!modal){
    return;
  }

  modal.classList.add("show");
}


/* ========== CLOSE MODAL ========== */
function closeModal(id){

  const modal =
    getEl(id);

  if(!modal){
    return;
  }

  modal.classList.remove("show");
}


/* ========== TOGGLE MODAL ========== */
function toggleModal(id){

  const modal =
    getEl(id);

  if(!modal){
    return;
  }

  modal.classList.toggle("show");
}


/* ========== MODAL TITLE ========== */
function setModalTitle(
  id,
  titulo
){

  const el =
    getEl(id);

  if(!el){
    return;
  }

  el.innerText = titulo;
}


/* ========== FOCUS INPUT ========== */
function focusInput(
  id,
  delay = 150
){

  setTimeout(() => {

    const el =
      getEl(id);

    if(el){

      el.focus();
    }

  }, delay);
}