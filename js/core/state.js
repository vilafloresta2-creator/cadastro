/* ----------------------------------------
                STATE
---------------------------------------- */

/* ========== ELEMENTOS GLOBAIS ========== */
const tela =
  document.getElementById("tela");


/* =========================================
              GLOBAL STATE
========================================= */

const state = {

  /* =========================================
                    DADOS
  ========================================= */

  associados: [],

  cobrancas: [],

  caixa: [],

  recibos: [],

  backups: [],

  fixas: [],

  fechamentos: [],

  reservas: [],


  /* =========================================
                 NAVEGAÇÃO
  ========================================= */

  telaAtual:
    "dashboard",


  /* =========================================
                   AGENDA
  ========================================= */

  agendaMes:
    new Date().getMonth(),

  agendaAno:
    new Date().getFullYear(),


  /* =========================================
                    EDIÇÃO
  ========================================= */

  editandoId:
    null,

  editandoCaixa:
    null,

  editandoFixaId:
    null,

  editandoReservaId:
    null,


  /* =========================================
                     UI
  ========================================= */

  loading:
    false,

  mostrarDevedores:
    false

};