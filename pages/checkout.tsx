import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useRouter } from 'next/router'
import { Lock, Shield, CreditCard, Smartphone } from 'lucide-react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_sua_chave_aqui')

function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setIsLoading(true)
    setError('')

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/sucesso` },
      redirect: 'if_required',
    })

    if (submitError) {
      setError(submitError.message || 'Erro no pagamento')
      setIsLoading(false)
    } else {
      router.push('/sucesso')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
        <PaymentElement />
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>
      )}

      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processando...
          </>
        ) : (
          <>
            <Lock className="w-5 h-5" />
            Pagar €2.00 e Baixar Relatório
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-1"><Shield className="w-4 h-4" /> SSL Seguro</div>
        <div className="flex items-center gap-1"><Lock className="w-4 h-4" /> Criptografado</div>
      </div>
    </form>
  )
}

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(false)

  const iniciarCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/criar-pagamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 200 })
      })
      const data = await res.json()
      setClientSecret(data.clientSecret)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  if (!clientSecret) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full card space-y-6 text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto">
            <CreditCard className="w-8 h-8 text-primary-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Relatório Premium</h1>
            <p className="text-slate-600">Análise completa de personalidade Big Five</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 space-y-3 text-left">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Relatório PDF (12 páginas)</span>
              <span className="font-semibold">€2.00</span>
            </div>
            <div className="border-t border-slate-200 pt-3 flex justify-between items-center font-bold text-lg">
              <span>Total</span>
              <span className="text-primary-600">€2.00</span>
            </div>
          </div>

          <div className="space-y-3">
            <button onClick={iniciarCheckout} disabled={loading} className="w-full btn-primary">
              {loading ? 'Carregando...' : 'Continuar para Pagamento'}
            </button>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <Smartphone className="w-4 h-4" />
              <span>Aceitamos MB Way, Cartão e mais</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full card">
        <h1 className="text-2xl font-bold text-slate-900 mb-6 text-center">Finalizar Compra</h1>
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  )
}