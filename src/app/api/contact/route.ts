import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering - critical for API routes in ISG
export const dynamic = 'force-dynamic';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  console.log('\n\n');
  console.log('='.repeat(60));
  console.log('🔵 [API Contact] POST REQUEST RECEBIDO!');
  console.log('='.repeat(60));
  console.log('Timestamp:', new Date().toISOString());
  console.log('URL:', request.url);
  console.log('Method:', request.method);
  console.log('='.repeat(60));
  console.log('\n');
  
  try {
    const body: ContactFormData = await request.json();
    console.log('📝 [API Contact] Body recebido:');
    console.log(JSON.stringify(body, null, 2));
    console.log('\n');

    // Validação básica
    if (!body.name || !body.email || !body.phone || !body.subject || !body.message) {
      console.log('❌ [API Contact] Validação falhou - campos faltando');
      return NextResponse.json(
        { error: 'Todos os campos obrigatórios devem ser preenchidos' },
        { status: 400 }
      );
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      console.log('❌ [API Contact] Email inválido:', body.email);
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Verificar se Postmark está configurado
    const postmarkToken = process.env.POSTMARK_GENERAL_TOKEN;
    
    console.log('🔑 [API Contact] Verificando POSTMARK_GENERAL_TOKEN...');
    console.log('POSTMARK_GENERAL_TOKEN configurada?', postmarkToken ? 'SIM ✅' : 'NÃO ❌');
    
    if (!postmarkToken) {
      console.log('\n⚠️  MODO DESENVOLVIMENTO ⚠️');
      console.log('POSTMARK_GENERAL_TOKEN não configurada');
      console.log('📧 Formulário de Contato Recebido (MOCK):');
      console.log(JSON.stringify(body, null, 2));
      console.log('\n');
      
      return NextResponse.json(
        { 
          success: true, 
          message: 'Mensagem recebida (modo desenvolvimento)',
          data: body 
        },
        { status: 200 }
      );
    }

    console.log('📤 [API Contact] Enviando email via Postmark...');
    console.log('Para:', 'contato@mupisystems.com.br');
    console.log('Assunto:', `[Site] ${body.subject}`);
    console.log('\n');

    // Enviar email via Postmark
    const response = await fetch('https://api.postmarkapp.com/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': postmarkToken,
      },
      body: JSON.stringify({
        From: 'contato@mupisystems.com.br',
        To: 'contato@mupisystems.com.br',
        ReplyTo: body.email,
        Subject: `[Site] ${body.subject}`,
        HtmlBody: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #5667fe 0%, #3d4fb8 100%);
      color: white;
      padding: 30px;
      border-radius: 8px 8px 0 0;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
    }
    .content {
      background: #f8f9fa;
      padding: 30px;
      border-radius: 0 0 8px 8px;
    }
    .field {
      margin-bottom: 20px;
      background: white;
      padding: 15px;
      border-radius: 6px;
      border-left: 4px solid #5667fe;
    }
    .field-label {
      font-weight: 600;
      color: #5667fe;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
    }
    .field-value {
      color: #333;
      font-size: 16px;
    }
    .message-box {
      background: white;
      padding: 20px;
      border-radius: 6px;
      border: 1px solid #e0e0e0;
      margin-top: 20px;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>📧 Nova Mensagem do Site</h1>
  </div>
  
  <div class="content">
    <div class="field">
      <div class="field-label">👤 Nome</div>
      <div class="field-value">${body.name}</div>
    </div>
    
    <div class="field">
      <div class="field-label">📧 E-mail</div>
      <div class="field-value"><a href="mailto:${body.email}">${body.email}</a></div>
    </div>
    
    <div class="field">
      <div class="field-label">📱 Telefone</div>
      <div class="field-value"><a href="tel:${body.phone}">${body.phone}</a></div>
    </div>
    
    ${body.company ? `
    <div class="field">
      <div class="field-label">🏢 Empresa</div>
      <div class="field-value">${body.company}</div>
    </div>
    ` : ''}
    
    <div class="field">
      <div class="field-label">📋 Assunto</div>
      <div class="field-value">${body.subject}</div>
    </div>
    
    <div class="message-box">
      <div class="field-label">💬 Mensagem</div>
      <div class="field-value" style="margin-top: 10px; white-space: pre-wrap;">${body.message}</div>
    </div>
  </div>
  
  <div class="footer">
    <p>Esta mensagem foi enviada através do formulário de contato do site <strong>MUPI Systems</strong></p>
    <p style="color: #999; font-size: 12px;">Recebida em ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</p>
  </div>
</body>
</html>
        `,
        MessageStream: 'outbound',
      }),
    });

    console.log('📡 [API Contact] Resposta do Postmark:');
    console.log('Status:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('\n❌ ERRO AO ENVIAR EMAIL VIA POSTMARK ❌');
      console.error('Status:', response.status);
      console.error('Erro:', JSON.stringify(errorData, null, 2));
      console.error('\n');
      throw new Error('Falha ao enviar email');
    }

    const result = await response.json();
    console.log('\n');
    console.log('✅'.repeat(30));
    console.log('✅ EMAIL ENVIADO COM SUCESSO!');
    console.log('✅'.repeat(30));
    console.log('Message ID:', result.MessageID);
    console.log('Resultado completo:', JSON.stringify(result, null, 2));
    console.log('✅'.repeat(30));
    console.log('\n');

    return NextResponse.json(
      { 
        success: true, 
        message: 'Mensagem enviada com sucesso!',
        emailId: result.MessageID 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('\n');
    console.error('❌'.repeat(30));
    console.error('❌ ERRO AO PROCESSAR FORMULÁRIO');
    console.error('❌'.repeat(30));
    console.error('Erro:', error);
    console.error('Stack:', error instanceof Error ? error.stack : 'N/A');
    console.error('❌'.repeat(30));
    console.error('\n');
    
    return NextResponse.json(
      { 
        error: 'Erro ao enviar mensagem. Por favor, tente novamente.',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}

// Método OPTIONS para CORS (se necessário)
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
