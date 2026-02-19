import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Download, Sparkles, FileText, Star, ChevronRight, RefreshCcw } from 'lucide-react'

interface Resultados {
  openness: number
  conscientiousness: number
  extraversion: number
  agreeableness: number
  neuroticism: number
}

const TRACOS = {
  openness: {
    nome: 'Abertura',
    descricao: 'Curiosidade, criatividade e apreciação pela arte e novas experiências',
    cor: 'bg-purple-500',
    icone: '🎨'
  },
  conscientiousness: {
    nome: 'Consciência',
    descricao: 'Organização, responsabilidade e confiabilidade',
    cor: 'bg-blue-500',
    icone: '📋'
  },
  extraversion: {
    nome: 'Extroversão',
    descricao: 'Sociabilidade, assertividade e energia positiva',
    cor: 'bg-yellow-500',
    icone: '⚡'
  },
  agreeableness: {
    nome: 'Amabilidade',
    descricao: 'Cooperação, empatia e confiança nos outros',
    cor: 'bg-green-500',
    icone: '💝'
  },
  neuroticism: {
    nome: 'Neuroticismo',
    descricao: 'Tendência a experienciar ansiedade e instabilidade emocional',
    cor: 'bg-red-500',
    icone: '🌊'
  }
}

export default function Resultados() {
  const router = useRouter()
  const [resultados, setResultados] = useState<Resultados | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('bigfive_results')
    if (saved) {
      setResultados(JSON.parse(saved))
    } else {
      router.push('/')
    }
  }, [router])

  if (!resultados) return null

  const ordenados = Object.entries(resultados)
    .sort(([,a], [,b]) => b - a)
    .map(([key, value]) => ({ key: key as keyof typeof TRACOS, value }))

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">

        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Seu Perfil de Personalidade
          </h1>
          <p className="text-slate-600 max-w-lg mx-auto">
            Baseado no modelo científico Big Five (OCEAN), aqui estão seus resultados:
          </p>
        </div>

        <div className="card space-y-6 animate-slide-up">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary-600" />
            Pontuações por Traço
          </h2>

          <div className="space-y-4">
            {Object.entries(resultados).map(([key, value]) => {
              const traco = TRACOS[key as keyof typeof TRACOS]
              return (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{traco.icone}</span>
                      <span className="font-medium text-slate-700">{traco.nome}</span>
                    </div>
                    <span className="font-bold text-slate-900">{value}%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${traco.cor} transition-all duration-1000 ease-out rounded-full`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500">{traco.descricao}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="card bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-primary-200 animate-slide-up">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-primary-900 mb-1">
                Seu Traço Dominante: {TRACOS[ordenados[0].key].nome}
              </h3>
              <p className="text-primary-800 text-sm leading-relaxed">
                Com {ordenados[0].value}%, este é o traço que mais define sua personalidade.
                {ordenados[0].key === 'openness' && " Você é uma pessoa criativa, curiosa e aberta a novas experiências."}
                {ordenados[0].key === 'conscientiousness' && " Você é organizado, responsável e confiável."}
                {ordenados[0].key === 'extraversion' && " Você é sociável, energético e se sente confortável em grupos."}
                {ordenados[0].key === 'agreeableness' && " Você é cooperativo, empático e valoriza harmonia nos relacionamentos."}
                {ordenados[0].key === 'neuroticism' && ordenados[0].value > 50 
                  ? " Você tende a ser mais sensível emocionalmente e reativo ao stress."
                  : " Você tende a ser emocionalmente estável e resiliente."}
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-slate-900 text-white animate-slide-up">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 rounded-full text-sm font-medium">
              <FileText className="w-4 h-4" />
              Relatório Premium Disponível
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Desbloqueie seu Relatório Completo
              </h2>
              <p className="text-slate-300 max-w-md mx-auto">
                Obtenha uma análise profunda de 12 páginas com insights detalhados sobre carreira, relacionamentos e desenvolvimento pessoal.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-lg mx-auto text-sm">
              {['Análise detalhada dos 5 traços', 'Perfil de carreira ideal', 'Compatibilidade em relacionamentos', 
                'Plano de desenvolvimento pessoal', 'Gráficos e visualizações exclusivas', 'PDF profissional personalizado'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button 
                onClick={() => router.push('/checkout')}
                className="w-full md:w-auto bg-primary-600 hover:bg-primary-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Comprar por apenas €2.00
                <ChevronRight className="w-5 h-5" />
              </button>
              <p className="text-xs text-slate-500 mt-3">
                Pagamento seguro via Stripe • Download imediato • 30 dias de garantia
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button onClick={() => router.push('/teste')} className="btn-secondary flex items-center justify-center gap-2">
            <RefreshCcw className="w-4 h-4" />
            Refazer Teste
          </button>
          <button onClick={() => router.push('/')} className="text-slate-500 hover:text-slate-700 py-3 px-6">
            Voltar ao Início
          </button>
        </div>

      </div>
    </div>
  )
}