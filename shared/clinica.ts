// Dados do espaço de estética FICTÍCIO usado na demonstração.
// Tudo o que a IA pode dizer sobre o negócio sai daqui.

export const CLINICA = {
  nome: 'Lume Estética',
  tipo: 'espaço de estética facial e corporal',
  assistente: 'Lia',
  cidade: 'São Carlos - SP',
  endereco: 'Rua Exemplo, 456, Jardim Lutfalla, São Carlos - SP (endereço fictício)',
  horarios: 'Segunda a sexta, das 9h às 20h. Sábado, das 9h às 14h. Domingo e feriados fechado.',
  // Agenda: [abre, fecha] por dia da semana (horas cheias). Domingo fechado.
  agenda: { semana: [9, 20], sabado: [9, 14], pausa: 13 },
  pagamento: 'Pix, dinheiro, débito e crédito. Pacotes de sessões em até 10x sem juros.',
  convenios: [] as string[],
  urgencia:
    'Se tiver vermelhidão forte, ardor ou inchaço depois de um procedimento, fale com a recepção na hora. Gestantes, lactantes e quem usa ácidos ou isotretinoína devem avisar antes de agendar peeling, laser ou microagulhamento.',
  estacionamento: 'Vagas na frente do espaço e estacionamento conveniado a 50 metros.',
  servicos: [
    { id: 'avaliacao', menu: 'sem custo', nome: 'Avaliação facial ou corporal', preco: 'gratuita', duracao: 30, descricao: 'Análise da pele ou do corpo e indicação do protocolo ideal, sem compromisso.' },
    { id: 'limpeza', menu: 'R$ 180', nome: 'Limpeza de pele profunda', preco: 'R$ 180', duracao: 60, descricao: 'Higienização, esfoliação, extração, máscara calmante e proteção.' },
    { id: 'hidratacao', menu: 'R$ 160', nome: 'Hidratação facial com LED', preco: 'R$ 160', duracao: 45, descricao: 'Ativos hidratantes e luz de LED para pele opaca ou desidratada.' },
    { id: 'peeling', menu: 'a partir de R$ 220', nome: 'Peeling químico superficial', preco: 'a partir de R$ 220', duracao: 45, descricao: 'Renovação da pele para manchas leves, textura e oleosidade. Exige avaliação.' },
    { id: 'microagulhamento', menu: 'a partir de R$ 350', nome: 'Microagulhamento', preco: 'a partir de R$ 350 por sessão', duracao: 60, descricao: 'Estímulo de colágeno para marcas de acne, poros e linhas finas. Exige avaliação.' },
    { id: 'drenagem', menu: 'R$ 140', nome: 'Drenagem linfática', preco: 'R$ 140 a sessão ou R$ 1.200 o pacote de 10', duracao: 60, descricao: 'Reduz retenção de líquidos e inchaço. Pós-operatório só com liberação médica.' },
    { id: 'modeladora', menu: 'R$ 150', nome: 'Massagem modeladora', preco: 'R$ 150 a sessão', duracao: 60, descricao: 'Manobras firmes para contorno corporal, em pacotes de 8 a 10 sessões.' },
    { id: 'laser', menu: 'a partir de R$ 90', nome: 'Depilação a laser', preco: 'axilas a partir de R$ 90 por sessão; outras áreas na avaliação', duracao: 30, descricao: 'Laser de diodo, em média 8 a 10 sessões. Exige avaliação e teste.' },
    { id: 'sobrancelha', menu: 'R$ 70', nome: 'Design de sobrancelhas com henna', preco: 'R$ 70', duracao: 40, descricao: 'Mapeamento do rosto, design e coloração com henna.' },
  ],
  equipe: [
    { nome: 'Camila Reis', area: 'Esteticista, tratamentos faciais' },
    { nome: 'Bruna Lopes', area: 'Esteticista, corporal e drenagem' },
    { nome: 'Paula Nogueira', area: 'Esteticista, laser e sobrancelhas' },
  ],
}

export type ServicoId = (typeof CLINICA.servicos)[number]['id']

const TZ = 'America/Sao_Paulo'

function partes(d: Date) {
  const f = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short', hour: '2-digit', hourCycle: 'h23' })
  const p = Object.fromEntries(f.formatToParts(d).map((x) => [x.type, x.value]))
  return { data: `${p.year}-${p.month}-${p.day}`, semana: p.weekday as string, hora: Number(p.hour) }
}

function hash(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return (h >>> 0) % 100
}

export type Horario = { data: string; diaSemana: string; hora: string }

const NOMES_DIA: Record<string, string> = { Mon: 'segunda', Tue: 'terça', Wed: 'quarta', Thu: 'quinta', Fri: 'sexta', Sat: 'sábado', Sun: 'domingo' }

/** Horários livres nos próximos dias. Parte deles aparece ocupada para parecer uma agenda real. */
export function horariosLivres(agora = new Date(), dias = 7, ocupados: string[] = []): Horario[] {
  const out: Horario[] = []
  const hoje = partes(agora)
  const { semana: hSemana, sabado: hSabado, pausa } = CLINICA.agenda
  for (let i = 0; i < dias + 3 && out.length < 400; i++) {
    const d = new Date(agora.getTime() + i * 86400000)
    const { data, semana } = partes(d)
    if (semana === 'Sun') continue
    const [abre, fecha] = semana === 'Sat' ? hSabado : hSemana
    for (let h = abre; h < fecha; h++) {
      if (h === pausa && semana !== 'Sat') continue
      if (data === hoje.data && h <= hoje.hora + 1) continue
      const hora = `${String(h).padStart(2, '0')}:00`
      const chave = `${data} ${hora}`
      if (hash(chave) < 45 || ocupados.includes(chave)) continue
      out.push({ data, diaSemana: NOMES_DIA[semana] ?? semana, hora })
    }
  }
  return out
}

export function textoClinica(): string {
  const c = CLINICA
  return [
    `Nome: ${c.nome} (${c.tipo} fictício de demonstração) - ${c.cidade}`,
    `Endereço: ${c.endereco}`,
    `Horário de funcionamento: ${c.horarios}`,
    `Formas de pagamento: ${c.pagamento}`,
    c.convenios.length ? `Convênios aceitos: ${c.convenios.join(', ')}.` : 'Não trabalhamos com convênios ou planos de saúde: só atendimento particular.',
    `Cuidados e contraindicações: ${c.urgencia}`,
    `Estacionamento: ${c.estacionamento}`,
    'Procedimentos e preços:',
    ...c.servicos.map((s) => `- ${s.nome} (id: ${s.id}): ${s.preco}. Duração: ${s.duracao} min. ${s.descricao}`),
    'Equipe:',
    ...c.equipe.map((e) => `- ${e.nome}: ${e.area}`),
  ].join('\n')
}
