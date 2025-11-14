import { NextResponse } from 'next/server';

// Force dynamic rendering - critical for API routes in ISG
export const dynamic = 'force-dynamic';

export async function GET() {
  console.log('🔵 [API Test] GET REQUEST RECEBIDO!');
  return NextResponse.json({ 
    success: true, 
    message: 'API está funcionando!',
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: Request) {
  console.log('🔵 [API Test] POST REQUEST RECEBIDO!');
  
  try {
    const body = await request.json();
    console.log('📝 Body recebido:', body);
    
    return NextResponse.json({ 
      success: true, 
      message: 'POST recebido com sucesso!',
      receivedData: body,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Erro:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Erro ao processar requisição' 
    }, { status: 500 });
  }
}
