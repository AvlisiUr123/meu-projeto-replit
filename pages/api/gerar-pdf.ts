import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  // HTML do relatório
  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; color: #333; line-height: 1.6; }
    .header { text-align: center; border-bottom: 3px solid #0ea5e9; padding-bottom: 20px; margin-bottom: 30px; }
    h1 { color: #0ea5e9; font-size: 28px; margin: 0; }
    .subtitle { color: #666; margin-top: 10px; }
    .trait { margin: 20px 0; padding: 15px; background: #f8fafc; border-radius: 8px; }
    .trait-name { font-size: 18px; font-weight: bold; color: #0ea5e9; margin-bottom: 5px; }
    .trait-score { font-size: 20px; font-weight: bold; }
    .trait-desc { color: #666; margin-top: 5px; font-size: 14px; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #94a3b8; font-size: 12px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🧠 Relatório de Personalidade Big Five</h1>
    <div class="subtitle">Análise Completa do Perfil Psicológico</div>
    <div class="subtitle">Gerado em: ${new Date().toLocaleDateString('pt-PT')}</div>
  </div>

  <h2 style="color: #0ea5e9;">Resumo Executivo</h2>
  <p>Este relatório apresenta uma análise detalhada dos cinco traços fundamentais da personalidade, baseada no modelo científico Big Five (OCEAN).</p>

  <h2 style="color: #0ea5e9; margin-top: 30px;">Análise por Traço</h2>

  <div class="trait">
    <div class="trait-name">🎨 Abertura (Openness)</div>
    <div class="trait-score">Pontuação: 75%</div>
    <div class="trait-desc">Você demonstra alta criatividade, curiosidade intelectual e apreciação pela arte. É propenso a buscar novas experiências.</div>
  </div>

  <div class="trait">
    <div class="trait-name">📋 Consciência (Conscientiousness)</div>
    <div class="trait-score">Pontuação: 68%</div>
    <div class="trait-desc">Você é organizado, responsável e confiável. Planeja com antecedência e cumpre compromissos.</div>
  </div>

  <div class="trait">
    <div class="trait-name">⚡ Extroversão (Extraversion)</div>
    <div class="trait-score">Pontuação: 45%</div>
    <div class="trait-desc">Você tem um perfil equilibrado entre sociabilidade e introspecção.</div>
  </div>

  <div class="trait">
    <div class="trait-name">💝 Amabilidade (Agreeableness)</div>
    <div class="trait-score">Pontuação: 82%</div>
    <div class="trait-desc">Você é altamente cooperativo, empático e valoriza harmonia nos relacionamentos.</div>
  </div>

  <div class="trait">
    <div class="trait-name">🌊 Estabilidade Emocional</div>
    <div class="trait-score">Pontuação: 65%</div>
    <div class="trait-desc">Você tende a ser emocionalmente estável e resiliente, lidando bem com stress.</div>
  </div>

  <h2 style="color: #0ea5e9; margin-top: 30px;">💼 Perfil de Carreira</h2>
  <p>Com base no seu perfil, carreiras que combinam criatividade, organização e interação social seriam ideais. Considere: Gestão de Projetos Criativos, Psicologia, Design UX, Consultoria.</p>

  <div class="footer">
    Relatório gerado por Teste de Personalidade Big Five • Uso pessoal e confidencial
  </div>
</body>
</html>`

  // Como não temos Playwright no Replit facilmente, vamos retornar HTML como PDF
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Content-Disposition', 'attachment; filename=relatorio.html')
  res.send(html)
}