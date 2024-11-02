import { NextResponse } from 'next/server';
import { extractCodeFromFilePath } from '@/lib/code';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const file = searchParams.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file specified' }, { status: 400 });
    }

    const content = await extractCodeFromFilePath(file);
    
    return NextResponse.json(
      { content },
      {
        headers: {
          'Cache-Control': 'no-store',
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.log('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch code' }, 
      { status: 500 }
    );
  }
}