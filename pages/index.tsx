import { useRouter } from 'next/router'
import { Brain, FileText, Sparkles, Clock, Shield } from 'lucide-react'

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">

        <div className="flex justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-2xl">
            <Brain className="w-10 h-10 text-white" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight">
            Teste de Personalidade
            <span className="block text-primary-600">Big Five</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-lg mx-auto">
            Descubra os cinco traços fundamentais da sua personalidade com base na ciência psicológica moderna
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
            <Clock className="w-6 h-6 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-slate-700">5-7 minutos</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
            <Shield className="w-6 h-6 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-slate-700">100% Gratuito</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
            <Sparkles className="w-6 h-6 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-slate-700">Resultados Imediatos</span>
          </div>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => router.push('/teste')}
            className="btn-primary text-lg w-full md:w-auto min-w-[280px]"
          >
            Iniciar Teste Gratuito
          </button>

          <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
            <FileText className="w-4 h-4" />
            <span>Relatório Premium de 12 páginas disponível por apenas €2.00</span>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500 mb-4">Avaliamos os 5 traços fundamentais:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Abertura (Openness)', 'Consciência (Conscientiousness)', 'Extroversão (Extraversion)', 
              'Amabilidade (Agreeableness)', 'Neuroticismo (Neuroticism)'].map((trait) => (
              <span key={trait} className="px-3 py-1 bg-white rounded-full text-xs font-medium text-slate-600 shadow-sm border border-slate-200">
                {trait}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}