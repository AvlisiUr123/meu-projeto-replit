# 🧠 Teste de Personalidade Big Five

Aplicação web completa com 30 perguntas, resultados em tempo real e relatório premium pago.

## 📁 Estrutura
- `pages/index.tsx` - Página inicial
- `pages/teste.tsx` - Teste com 30 perguntas
- `pages/resultados.tsx` - Resultados + CTA Premium
- `pages/checkout.tsx` - Pagamento Stripe
- `pages/sucesso.tsx` - Download do relatório
- `pages/api/` - Backend serverless

## 🚀 Instalação Rápida no Replit

### Método 1: GitHub (Recomendado)
1. Crie repositório no GitHub com estes ficheiros
2. No Replit: Click "Import from GitHub"
3. Cole URL do repositório
4. Clique "Import"

### Método 2: Upload ZIP
1. Faça download desta pasta como ZIP
2. No Replit: Create → Upload ZIP
3. Selecione o arquivo

### Método 3: Manual
1. Crie Repl "Next.js"
2. Copie cada ficheiro para a estrutura correspondente
3. Execute: `npm install`

## ⚙️ Configuração Stripe (Obrigatória)

1. Crie conta gratuita em [stripe.com](https://stripe.com)
2. Vá em Developers → API Keys
3. Copie as "Test keys"
4. No Replit, clique no ícone 🔒 Secrets (painel esquerdo)
5. Adicione:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = pk_test_...
   - `STRIPE_SECRET_KEY` = sk_test_...

## ▶️ Executar

Clique no botão **"Run"** no Replit ou execute:
```bash
npm run dev
```

## 💰 Testar Pagamentos

Use estes dados de teste do Stripe:
- **Cartão**: 4242 4242 4242 4242
- **Data**: Qualquer futura (12/25)
- **CVC**: Qualquer 3 dígitos (123)
- **MB Way**: Selecione no checkout e use número de teste

## 🎯 Funcionalidades

✅ 30 perguntas Big Five (OCEAN)  
✅ Design moderno e responsivo  
✅ Cálculo automático de pontuações  
✅ Gráficos visuais de resultados  
✅ Checkout Stripe (Cartão + MB Way)  
✅ Relatório PDF premium (€2.00)  
✅ Download imediato após pagamento  

## 📝 Notas

- O PDF é gerado em HTML (Playwright pode ser adicionado depois para PDF real)
- Em produção, configure um serviço de email (SendGrid/AWS SES) em `enviar-email.ts`
- Use sempre "Test keys" do Stripe para desenvolvimento
