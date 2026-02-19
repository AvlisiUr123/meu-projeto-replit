import { useState } from 'react'
import { useRouter } from 'next/router'
import { ChevronRight, ChevronLeft, Check } from 'lucide-react'

// 30 PERGUNTAS BIG FIVE (OCEAN) - 6 por traço
const QUESTOES = [
  // ABERTURA (Openness) - Questões 1-6
  { id: 1, text: "Tenho uma imaginação ativa e criativa", trait: "openness", reverse: false },
  { id: 2, text: "Aprecio arte, música e literatura", trait: "openness", reverse: false },
  { id: 3, text: "Sou curioso sobre como as coisas funcionam", trait: "openness", reverse: false },
  { id: 4, text: "Prefiro trabalho prático a trabalho intelectual", trait: "openness", reverse: true },
  { id: 5, text: "Gosto de experimentar coisas novas e diferentes", trait: "openness", reverse: false },
  { id: 6, text: "Tenho dificuldade em entender ideias abstratas", trait: "openness", reverse: true },

  // CONSCIENCIA (Conscientiousness) - Questões 7-12
  { id: 7, text: "Sou organizado e mantenho tudo em ordem", trait: "conscientiousness", reverse: false },
  { id: 8, text: "Presto atenção aos detalhes", trait: "conscientiousness", reverse: false },
  { id: 9, text: "Cumpro minhas obrigações e responsabilidades", trait: "conscientiousness", reverse: false },
  { id: 10, text: "Deixo minhas coisas espalhadas pela casa", trait: "conscientiousness", reverse: true },
  { id: 11, text: "Planejo com antecedência e sigo um cronograma", trait: "conscientiousness", reverse: false },
  { id: 12, text: "Costumo procrastinar tarefas importantes", trait: "conscientiousness", reverse: true },

  // EXTROVERSÃO (Extraversion) - Questões 13-18
  { id: 13, text: "Sou o centro das atenções em festas", trait: "extraversion", reverse: false },
  { id: 14, text: "Converso facilmente com pessoas desconhecidas", trait: "extraversion", reverse: false },
  { id: 15, text: "Tenho energia e entusiasmo pela vida", trait: "extraversion", reverse: false },
  { id: 16, text: "Prefiro ficar sozinho a estar em grupos grandes", trait: "extraversion", reverse: true },
  { id: 17, text: "Assumo a liderança em grupos", trait: "extraversion", reverse: false },
  { id: 18, text: "Sou quieto e reservado com estranhos", trait: "extraversion", reverse: true },

  // AMABILIDADE (Agreeableness) - Questões 19-24
  { id: 19, text: "Me preocupo com os sentimentos dos outros", trait: "agreeableness", reverse: false },
  { id: 20, text: "Ajudo os outros sem esperar nada em troca", trait: "agreeableness", reverse: false },
  { id: 21, text: "Confio nas pessoas facilmente", trait: "agreeableness", reverse: false },
  { id: 22, text: "Sou desconfiado das intenções das pessoas", trait: "agreeableness", reverse: true },
  { id: 23, text: "Sou gentil e compreensivo com todos", trait: "agreeableness", reverse: false },
  { id: 24, text: "Tenho dificuldade em perdoar ofensas", trait: "agreeableness", reverse: true },

  // NEUROTICISMO (Neuroticism) - Questões 25-30
  { id: 25, text: "Fico facilmente ansioso ou nervoso", trait: "neuroticism", reverse: false },
  { id: 26, text: "Preocupo-me muito com o futuro", trait: "neuroticism", reverse: false },
  { id: 27, text: "Tenho mudanças de humor frequentes", trait: "neuroticism", reverse: false },
  { id: 28, text: "Mantenho a calma em situações de pressão", trait: "neuroticism", reverse: true },
  { id: 29, text: "Sinto-me triste ou deprimido facilmente", trait: "neuroticism", reverse: false },
  { id: 30, text: "Lido bem com stress e adversidades", trait: "neuroticism", reverse: true },
]

const ESCALA = [
  { value: 1, label: "Discordo Totalmente" },
  { value: 2, label: "Discordo" },
  { value: 3, label: "Neutro" },
  { value: 4, label: "Concordo" },
  { value: 5, label: "Concordo Totalmente" },
]

export default function Teste() {
  const router = useRouter()
  const [respostas, setRespostas] = useState<Record<number, number>>({})
  const [perguntaAtual, setPerguntaAtual] = useState(0)

  const progresso = ((perguntaAtual + 1) / QUESTOES.length) * 100
  const pergunta = QUESTOES[perguntaAtual]

  const responder = (valor: number) => {
    setRespostas(prev => ({ ...prev, [pergunta.id]: valor }))

    setTimeout(() => {
      if (perguntaAtual < QUESTOES.length - 1) {
        setPerguntaAtual(prev => prev + 1)
      }
    }, 300)
  }

  const voltar = () => {
    if (perguntaAtual > 0) {
      setPerguntaAtual(prev => prev - 1)
    }
  }

  const finalizar = () => {
    const scores = {
      openness: 0, conscientiousness: 0, extraversion: 0, 
      agreeableness: 0, neuroticism: 0 
    }
    const counts = { ...scores }

    QUESTOES.forEach(q => {
      const resposta = respostas[q.id]
      if (resposta) {
        const valor = q.reverse ? 6 - resposta : resposta
        scores[q.trait as keyof typeof scores] += valor
        counts[q.trait as keyof typeof counts] += 1
      }
    })

    const normalized = Object.keys(scores).reduce((acc, key) => {
      const k = key as keyof typeof scores
      acc[k] = Math.round((scores[k] / (counts[k] * 5)) * 100)
      return acc
    }, {} as Record<string, number>)

    localStorage.setItem('bigfive_results', JSON.stringify(normalized))
    router.push('/resultados')
  }

  const podeFinalizar = Object.keys(respostas).length === QUESTOES.length

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">

        <div className="card space-y-4">
          <div className="flex justify-between items-center text-sm text-slate-500">
            <span>Questão {perguntaAtual + 1} de {QUESTOES.length}</span>
            <span>{Math.round(progresso)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progresso}%` }} />
          </div>
        </div>

        <div className="card min-h-[300px] flex flex-col justify-between">
          <div className="space-y-6">
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold uppercase tracking-wider">
              {pergunta.trait === 'openness' && 'Abertura'}
              {pergunta.trait === 'conscientiousness' && 'Consciência'}
              {pergunta.trait === 'extraversion' && 'Extroversão'}
              {pergunta.trait === 'agreeableness' && 'Amabilidade'}
              {pergunta.trait === 'neuroticism' && 'Neuroticismo'}
            </span>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
              {pergunta.text}
            </h2>
          </div>

          <div className="grid grid-cols-5 gap-2 md:gap-4 mt-8">
            {ESCALA.map((opcao) => {
              const selecionado = respostas[pergunta.id] === opcao.value
              return (
                <button
                  key={opcao.value}
                  onClick={() => responder(opcao.value)}
                  className={`flex flex-col items-center p-3 md:p-4 rounded-xl transition-all duration-200 ${
                    selecionado 
                      ? 'bg-primary-600 text-white shadow-lg scale-105' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  <span className="text-lg md:text-xl font-bold mb-1">{opcao.value}</span>
                  <span className="text-[10px] md:text-xs text-center leading-tight hidden md:block">
                    {opcao.label}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="flex justify-between text-xs text-slate-400 mt-2 md:hidden">
            <span>Discordo</span>
            <span>Concordo</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={voltar}
            disabled={perguntaAtual === 0}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Anterior
          </button>

          {podeFinalizar ? (
            <button onClick={finalizar} className="btn-primary flex items-center gap-2">
              <Check className="w-5 h-5" />
              Ver Resultados
            </button>
          ) : (
            <button
              onClick={() => perguntaAtual < QUESTOES.length - 1 && setPerguntaAtual(p => p + 1)}
              disabled={!respostas[pergunta.id]}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Pular
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="text-center text-sm text-slate-500">
          {Object.keys(respostas).length} de {QUESTOES.length} respondidas
        </div>

      </div>
    </div>
  )
}