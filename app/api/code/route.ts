import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const filePath = request.nextUrl.searchParams.get('path');
    
    if (!filePath) {
      return NextResponse.json(
        { error: 'No path provided' }, 
        { status: 400 }
      );
    }

    // Sanitize the file path to prevent directory traversal
    const sanitizedPath = path.normalize(filePath).replace(/^(\.\.(\/|\\|$))+/, '');
    const fullPath = path.join(process.cwd(), sanitizedPath);

    try {
      const content = await fs.readFile(fullPath, 'utf-8');
      
      return NextResponse.json(
        { content }, 
        {
          headers: {
            'Cache-Control': 'no-store',
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (readError) {
      console.error('Error reading file:', {
        path: sanitizedPath,
        error: readError instanceof Error ? readError.message : 'Unknown error'
      });
      
      return NextResponse.json(
        { error: 'File not found or inaccessible' }, 
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('API error:', error instanceof Error ? error.message : 'Unknown error');
    
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}