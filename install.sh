#!/bin/bash
# Script de instalação automática para Replit

echo "🚀 Instalando dependências..."
npm install

echo "✅ Instalação completa!"
echo ""
echo "⚠️  IMPORTANTE: Configure as variáveis de ambiente no Replit:"
echo "   1. Clique no ícone 🔒 'Secrets' no painel esquerdo"
echo "   2. Adicione: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_..."
echo "   3. Adicione: STRIPE_SECRET_KEY=sk_test_..."
echo ""
echo "📝 Para obter chaves Stripe gratuitas:"
echo "   1. Vá em https://stripe.com"
echo "   2. Crie conta gratuita"
echo "   3. Developers → API Keys → Use 'Test keys'"
echo ""
echo "▶️  Clique 'Run' para iniciar!"
