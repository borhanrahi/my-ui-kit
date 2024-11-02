import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filePath = searchParams.get('path');

    if (!filePath) {
      return new Response('File path is required', { status: 400 });
    }

    // Ensure we're reading from the correct directory in production
    const baseDir = process.cwd();
    const fullPath = path.join(baseDir, filePath);
    
    const content = await fs.promises.readFile(fullPath, 'utf-8');
    
    return new Response(JSON.stringify({ content }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error reading file:', error);
    return new Response('Error reading file', { status: 500 });
  }
}