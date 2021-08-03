const solicitacao = {
  duracaoServico: '01:30'
}

const agenda = [
  {
    nome: 'João',
    disponibilidade: {
      inicio: '07:00',
      fim: '17:30'
    },
    horariosAgendados: [
      {
        inicio: '07:00',
        fim: '08:00'
      },
      {
        inicio: '10:30',
        fim: '11:30'
      },
      {
        inicio: '11:30',
        fim: '12:30'
      }
    ]
  },
  {
    nome: 'Pedro',
    disponibilidade: {
      inicio: '07:30',
      fim: '16:00'
    },
    horariosAgendados: [
      {
        inicio: '08:00',
        fim: '08:30'
      },
      {
        inicio: '10:00',
        fim: '11:00'
      },
      {
        inicio: '12:00',
        fim: '13:30'
      },
      {
        inicio: '15:00',
        fim: '16:00'
      }
    ]
  },
]

function verificarHorarios(sol, age) {

  let agendaDisponivel = []
  
  age.forEach((cabeleireiro) => {

    let horariosDisponiveis = []
    
    let duracaoDoServico = (Number(sol.duracaoServico.split(':')[0]) * 60) + Number(sol.duracaoServico.split(':')[1])
    let horarioInicial = (Number(cabeleireiro.disponibilidade.inicio.split(':')[0]) * 60) + Number(cabeleireiro.disponibilidade.inicio.split(':')[1])
    let horarioFinal = (Number(cabeleireiro.disponibilidade.fim.split(':')[0]) * 60) + Number(cabeleireiro.disponibilidade.fim.split(':')[1])

    let horariosConvertidos = cabeleireiro.horariosAgendados.map((value, index, element) => {
      return {
        inicio: (Number(value.inicio.split(':')[0]) * 60) + Number(Number(value.inicio.split(':')[1])),
        fim: (Number(value.fim.split(':')[0]) * 60) + Number(Number(value.fim.split(':')[1]))
      }
    })

    let temp = horarioInicial

    // Estrutura de repetição que trata os horários a partir do inicio da jornada, até o primeiro corte
    while (horariosConvertidos[0].inicio - temp >= duracaoDoServico) {
      let conversor = [((temp - (temp % 60)) / 60).toString(), (temp % 60).toString()]

      if (conversor[0].length === 1) {
        conversor[0] = `0${conversor[0]}`
      }

      if (conversor[1].length === 1) {
        conversor[1] = `${conversor[1]}0`
      }

      horariosDisponiveis.push(conversor.join(':'))
      temp += 30
    }

    horariosConvertidos.forEach((value, index, element) => {

      temp = value.fim

      if (element.length > index + 1) {
        // Estrutura de repetição que trata os horários a partir do primeiro corte, até o último corte.
        while (element[index + 1].inicio - temp >= duracaoDoServico) {
          let conversor = [((temp - (temp % 60)) / 60).toString(), (temp % 60).toString()]

          if (conversor[0].length === 1) {
            conversor[0] = `0${conversor[0]}`
          }

          if (conversor[1].length === 1) {
            conversor[1] = `${conversor[1]}0`
          }

          horariosDisponiveis.push(conversor.join(':'))
          temp += 30
        }
      }
    })

    temp = horariosConvertidos[horariosConvertidos.length - 1].fim

    // Estrutura de repetição que trata os horários a partir do último corte até o momento de encerrar o expediente.
    while (horarioFinal - temp >= duracaoDoServico) {
      let conversor = [((temp - (temp % 60)) / 60).toString(), (temp % 60).toString()]

      if (conversor[0].length === 1) {
        conversor[0] = `0${conversor[0]}`
      }

      if (conversor[1].length === 1) {
        conversor[1] = `${conversor[1]}0`
      }

      horariosDisponiveis.push(conversor.join(':'))
      temp += 30

    }

    // após tratado os dados de um cabeleireiro, coloca dentro do aray "agendaDisponivel" e vai para o próximo cabeleireiro
    agendaDisponivel.push({
      nome: cabeleireiro.nome,
      horariosDisponiveis: horariosDisponiveis
    })
  })

  console.log(agendaDisponivel)
  return agendaDisponivel

}

// chamada da função
verificarHorarios(solicitacao, agenda)