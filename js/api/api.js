/* =========================================
   API
========================================= */


/* ========== POST API RAW ========== */
async function postAPI(body = {}){

  const formData =
    new FormData();

  formData.append(
    "dados",
    JSON.stringify(body)
  );

  const response =
    await fetch(API_URL,{

      method:"POST",

      body: formData
    });

  return response.json();
}