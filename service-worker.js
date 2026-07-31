/* ----------------------------------------------
            SERVICE WORKER
---------------------------------------------- */

/* =========================================
            VERSIONAMENTO
========================================= */
const APP_VERSION =
  "1.0.0";

const CACHE_NAME =
  `bairro-cache-${APP_VERSION}`;


/* =========================================
          ARQUIVOS CACHE
========================================= */
const FILES_TO_CACHE = [

  "./",
  "./index.html",

  "./css/style.css",

  "./manifest.json",

  "./js/ui.js",

  "./js/core/config.js",
  "./js/core/state.js",
  "./js/core/dom.js",
  "./js/core/navigation.js",
  "./js/core/render.js",
  "./js/core/init.js",

  "./js/utils/helpers.js",
  "./js/utils/format.js",
  "./js/utils/masks.js",
  "./js/utils/utils.js",
  "./js/utils/validators.js",

  "./js/api/api.js",
  "./js/api/request.js",
  "./js/api/load.js",

  "./js/components/toast.js",
  "./js/components/loading.js",
  "./js/components/dialog.js",
  "./js/components/modal-core.js",
  "./js/components/modals.js",
  "./js/components/empty.js",

  "./js/components/cards/associados-card.js",
  "./js/components/cards/reserva-card.js",
  "./js/components/cards/cobrancas-card.js",
  "./js/components/cards/caixa-card.js",
  "./js/components/cards/relatorios-card.js",
  "./js/components/cards/fixas-card.js",
  "./js/components/cards/card.js",

  "./js/services/associados.service.js",
  "./js/services/cobrancas.service.js",      
  
  "./js/modules/backups.js",
  "./js/modules/dashboard.js",
  "./js/modules/recibos.js",

  "./js/modules/relatorios/relatorios-actions.js",
  "./js/modules/relatorios/reservas-modal.js",
  "./js/modules/relatorios/relatorios.js",

  "./js/modules/agenda/agenda-actions.js",
  "./js/modules/agenda/agenda-modal.js",
  "./js/modules/agenda/agenda-preview.js",
  "./js/modules/agenda/agenda-render.js",
  "./js/modules/agenda/agenda-utils.js",
  "./js/modules/agenda/agenda.js",

  "./js/modules/associados/associados-actions.js",
  "./js/modules/associados/associados-filter.js",
  "./js/modules/associados/associados-form.js",
  "./js/modules/associados/associados-render.js",
  "./js/modules/associados/associados-status.js",  
  "./js/modules/associados/associados.js",
  
  "./js/modules/caixa/caixa-modal.js",
  "./js/modules/caixa/caixa-actions.js",
  "./js/modules/caixa/caixa-form.js",
  "./js/modules/caixa/caixa-modal.js",
  "./js/modules/caixa/caixa-render.js",  
  
  "./js/modules/cobrancas/cobrancas-actions.js",
  "./js/modules/cobrancas/cobrancas-filter.js",
  "./js/modules/cobrancas/cobrancas-render.js",  

  "./js/modules/reservas/reservas-actions.js",
  "./js/modules/reservas/reservas-form.js",
  "./js/modules/reservas/reservas-modal.js",
  "./js/modules/reservas/reservas-recebimentos.js",
  "./js/modules/reservas/reservas-utils.js",
  "./js/modules/reservas/reservas-delete.js",
  "./js/modules/reservas/reservas-render.js",
  "./js/modules/reservas/reservas.js",
  
  "./js/modules/fixas/fixas-form.js",  
  "./js/modules/fixas/fixas-modal.js",
  "./js/modules/fixas/fixas-render.js",
  "./js/modules/fixas/fixas.js",  

  "./js/modules/reservas/reservas-actions.js",
  "./js/modules/reservas/reservas-delete.js",
  "./js/modules/reservas/reservas-form.js",
  "./js/modules/reservas/reservas-modal.js",
  "./js/modules/reservas/reservas-recebimentos.js",
  "./js/modules/reservas/reservas-render.js",
  "./js/modules/reservas/reservas-utils.js",

];


/* =========================================
              INSTALL
========================================= */
self.addEventListener(

  "install",

  event => {

    event.waitUntil(

      caches.open(CACHE_NAME)

        .then(cache => {

          return cache.addAll(
            FILES_TO_CACHE
          );

        })

    );

    self.skipWaiting();
  }
);


/* =========================================
                ACTIVATE
========================================= */
self.addEventListener(

  "activate",

  event => {

    event.waitUntil(

      caches.keys()

        .then(keys => {

          return Promise.all(

            keys.map(key => {

              if(key !== CACHE_NAME){

                return caches.delete(key);
              }

            })

          );

        })

    );

    self.clients.claim();
  }
);


/* =========================================
                FETCH
========================================= */
self.addEventListener(

  "fetch",

  event => {

    event.respondWith(

      caches.match(event.request)

        .then(response => {

          return response || fetch(event.request);

        })

    );
  }
);