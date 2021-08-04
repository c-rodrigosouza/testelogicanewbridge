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

// Função para tratar a disponibilidade de cada cabeleireiro.
function retornoDisponibilidade(age) {
  let agendaCabeleireiro = []
  let horaInicio = age.disponibilidade.inicio
  let horaFim = age.disponibilidade.fim
  let horaTemporario = horaInicio

  // Cria um array que adiciona todos os horários do cabeleireiro de 30 em 30 minutos, considerando todo o expediente.
  agendaCabeleireiro.length =
    (((Number(horaFim.split(':')[0]) * 60) + (Number(horaFim.split(':')[1]))) -
      ((Number(horaInicio.split(':')[0]) * 60) + (Number(horaInicio.split(':')[1])))) / 30
  agendaCabeleireiro.fill(0, 0)
  agendaCabeleireiro = agendaCabeleireiro.map((val, ind) => {
    if (ind !== 0) {
      horaTemporario =
        `${horaTemporario.split(':')[1] === '00'
          ?
          horaTemporario.split(':')[0]
          :
          (Number(horaTemporario.split(':')[0]) + 1).toString().length < 2
            ? '0' + (Number(horaTemporario.split(':')[0]) + 1).toString()
            : (Number(horaTemporario.split(':')[0]) + 1).toString()}:${horaTemporario.split(':')[1] === '00' ? '30' : '00'}`
    }
    return horaTemporario
  })

  // Verifica os horários em que o cabeleireiro estará ocupado na agenda e substitui o tempo correspodente no array anterior pela string 'ocupado'.
  age.horariosAgendados.forEach((val) => {
    let inicioCorte = agendaCabeleireiro.indexOf(val.inicio)
    let fimCorte = agendaCabeleireiro.indexOf(val.fim) >= 0 ? agendaCabeleireiro.indexOf(val.fim) : agendaCabeleireiro.length
    agendaCabeleireiro.fill('ocupado', inicioCorte, fimCorte)
  })
  return agendaCabeleireiro
}

// Função que recebe o array com a agenda de todos os cabeleireiros e o tempo necessário para o procedimento que deseja agendar.
function verificarHorarios(arrayAgenda, solic) {

  // Converte o tempo necessário em formato numérico, para saber espaços de 30 minutos o procedimento irá consumir.
  let tempoNecessario = ((Number(solic.duracaoServico.split(':')[0]) * 60) + Number(solic.duracaoServico.split(':')[1])) / 30
  let horariosDisponiveis = []

  /* Tratando todos os cabeleireiros no array chamando a função retornoDisponibilidade() para saber os horários disponíveis e depois calculando onde
  o procedimento que deseja-se agendar se encaixa. Depois disso, coloca os horários disponíveis e possíveis para o procedimento em um array. */
  arrayAgenda.forEach((value) => {
    let agendaCabeleireiro = retornoDisponibilidade(value)
    let agendaCabeleireiroDisponivel = []
    agendaCabeleireiro.forEach((val, ind, ele) => {
      if (val !== 'ocupado' && ele.length >= ind + tempoNecessario) {
        let tempoDisponivel = true
        for (i = 1; i < tempoNecessario; i++) {
          if (ele[ind + i] == 'ocupado') {
            tempoDisponivel = false
            break
          }
        }
        if (tempoDisponivel) {
          agendaCabeleireiroDisponivel.push(val)
        }
      }
    })

    // Passando as informações de cada cabeleireiro para o array que será retornado ao final da função.
    horariosDisponiveis.push({
      nome: value.nome,
      horariosDisponiveis: [...agendaCabeleireiroDisponivel]
    })
  })
  console.log(horariosDisponiveis)
  return horariosDisponiveis
}

verificarHorarios(agenda, solicitacao)