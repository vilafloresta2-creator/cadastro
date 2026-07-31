/* ----------------------------------------
              TOAST
---------------------------------------- */


/* ========== SHOW TOAST ========== */

function showToast(

  msg = "",

  tipo = "success"

){

  const id =

    "toast_" +

    Date.now();


  const html = `

    <div

      id="${id}"

      class="toast toast-${tipo}"

    >

      ${msg}

    </div>

  `;


  document.body.insertAdjacentHTML(

    "beforeend",

    html

  );


  const el =

    document.getElementById(id);


  requestAnimationFrame(() => {

    el?.classList.add("show");

  });


  setTimeout(() => {

    if(!el){

      return;

    }


    el.classList.remove("show");


    setTimeout(() => {

      el.remove();

    }, 300);


  }, TIMEOUTS.toast);

}