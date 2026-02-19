import { useState } from 'react'
import { useRouter } from 'next/router'
import { CheckCircle, Download, FileText, Mail, Home } from 'lucide-react'

export default function Sucesso() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)

  const downloadPDF = async () => {
    const res = await fetch('/api/gerar-pdf', { method: 'POST' })
    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'relatorio-personalidade.pdf'
    a.click()
  }

  const enviarEmail = async () => {
    if (!email) return
    await fetch('/api/enviar-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    setEnviado(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-lg w-full card text-center space-y-6 animate-fade-in">

        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Pagamento Confirmado!</h1>
          <p className="text-slate-600">Seu relatório premium está pronto para download.</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-green-600" />
            <div className="text-left">
              <p className="font-semibold text-slate-900">relatorio-personalidade.pdf</p>
              <p className="text-sm text-slate-500">12 páginas • PDF</p>
            </div>
          </div>

          <button onClick={downloadPDF} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <Download className="w-5 h-5" />
            Baixar Relatório Agora
          </button>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-200">
          <p className="text-sm text-slate-600">Quer receber uma cópia por email?</p>
          {!enviado ? (
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button onClick={enviarEmail} className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Enviar
              </button>
            </div>
          ) : (
            <p className="text-green-600 text-sm">✅ Enviado com sucesso!</p>
          )}
        </div>

        <button onClick={() => router.push('/')} className="flex items-center justify-center gap-2 mx-auto text-slate-500 hover:text-slate-700">
          <Home className="w-4 h-4" />
          Voltar ao Início
        </button>

      </div>
    </div>
  )
}