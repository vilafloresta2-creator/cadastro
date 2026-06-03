/* =========================================
   SERVICE WORKER
========================================= */


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
  "./js/components/associados-card.js",

  "./js/services/associados.service.js",
  "./js/services/cobrancas.service.js",

  "./js/modules/dashboard.js",
  "./js/modules/devedores.js",
  "./js/modules/caixa.js",
  "./js/modules/fixas.js",
  "./js/modules/reservas.js",
  "./js/modules/relatorios.js",
  "./js/modules/backups.js",
  "./js/modules/recibos.js",
  "./js/modules/agenda.js",

  "./js/modules/associados/status.js",
  "./js/modules/associados/filter.js",
  "./js/modules/associados/form.js",
  "./js/modules/associados/render.js",
  "./js/modules/associados/associados.js",

  "./js/modules/cobrancas/filter.js",
  "./js/modules/cobrancas/render.js",
  "./js/modules/cobrancas/actions.js",
  "./js/modules/cobrancas/cobrancas.js"
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