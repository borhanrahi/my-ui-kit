import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get('path');

  if (!filePath) {
    return NextResponse.json({ error: 'No file path provided' }, { status: 400 });
  }

  try {
    const fullPath = path.join(process.cwd(), filePath);
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    return NextResponse.json({ content: fileContent });
  } catch (error) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}