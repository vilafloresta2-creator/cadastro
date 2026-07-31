/* ----------------------------------------------
                  DASHBOARD RENDER
---------------------------------------------- */

/* ================= RENDER ================= */
function renderDashboard(){

  const kpi =
    obterKPIsDashboard();

  const proximasReservas =
    obterProximasReservas();

  const alertas =
    obterAlertasDashboard();

  const mesAtual =
    obterMes(new Date());

  const ultimos =
    obterUltimosLancamentos(5);

  let htmlUltimos = "";

  ultimos.forEach(caixa => {

    htmlUltimos += renderCardPadrao({

      titulo:
        caixa.descricao,

      subtitulo:
        caixa.categoria,

      valor:
        moeda(caixa.valor),

      valorCor:
        corTipoCaixa(caixa.tipo)

    });

  });

  tela.innerHTML = `

    <div class="top">

      ${renderCardKPI({

        titulo:"Entradas",

        valor:
          moeda(kpi.entradas),

        classe:
          "text-success",

        onclick:
          `abrirRelatorioCaixa(
            '${mesAtual}',
            'entrada'
          )`

      })}

      ${renderCardKPI({

        titulo:"Saídas",

        valor:
          moeda(kpi.saidas),

        classe:
          "text-danger",

        onclick:
          `abrirRelatorioCaixa(
            '${mesAtual}',
            'saida'
          )`

      })}

      ${renderCardKPI({

        titulo:"Saldo",

        valor:
          moeda(kpi.saldo),

        classe:
          kpi.saldo >= 0
            ? "text-success"
            : "text-danger"

      })}

      ${renderCardKPI({

        titulo:"Inadimplência",

        valor:
          moeda(kpi.inadimplencia),

        classe:
          "text-warning",

        onclick:
          `abrirRelatorioInadimplentes(
            '${mesAtual}'
          )`

      })}

      ${renderCardKPI({

        titulo:"Associados Ativos",

        valor:
          kpi.ativos

      })}

    </div>

    ${renderSectionTitle("Próximas Reservas")}

    ${

      proximasReservas.length

        ? proximasReservas.map(r =>

            renderCard(`

              <strong>
                ${r.nome}
              </strong>

              <br>

              📍 ${r.espaco}

              <br>

              📅 ${formatarData(r.data)}
              às
              ${formatarHora(r.hora)}

            `)

          ).join("")

        : 

            renderCard(`
                Nenhuma reserva futura.
            `)

          
    }

    ${renderSectionTitle("Alertas")}

    ${renderCard(`

      ${

        alertas.cobrancasPendentes > 0

          ? `

              <div>
                ⚠ ${alertas.cobrancasPendentes}
                cobranças pendentes
              </div>

            `

          : ""

      }

      ${

        alertas.reservasComSaldo > 0

          ? `

              <div>
                ⚠ ${alertas.reservasComSaldo}
                reservas com saldo aberto
              </div>

            `

          : ""

      }

      ${

        alertas.associadosInativos > 0

          ? `

              <div>
                ⚠ ${alertas.associadosInativos}
                associados inativos
              </div>

            `

          : ""

      }

      ${

        alertas.cobrancasPendentes === 0 &&
        alertas.reservasComSaldo === 0 &&
        alertas.associadosInativos === 0

          ? `

              <div>
                ✅ Nenhum alerta.
              </div>

            `

          : ""

      }

    `)}

    <div style="margin-top:20px;">

      ${renderSectionTitle("Últimos lançamentos")}

      ${

        htmlUltimos ||

        renderListaVazia(
          "Nenhum lançamento encontrado."
        )

      }

    </div>

  `;
}