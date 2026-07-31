/* ----------------------------------------
              ACTIONS
---------------------------------------- */

function renderIconButton({
  icon,
  classe = "btn-icon",
  onclick = ""
}){

  return `
    <button
      type="button"
      class="${classe}"
      onclick="${onclick}"
    >
      ${icon}
    </button>
  `;
}