export async function extractCodeFromFilePath(path: string): Promise<string> {
  try {
    // For production (Vercel), we need to use absolute URLs
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL 
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` 
      : 'http://localhost:3000';
      
    const response = await fetch(`${baseUrl}/api/code?path=${encodeURIComponent(path)}`);
    if (!response.ok) throw new Error('Failed to fetch code');
    const data = await response.json();
    return data.content || '';
  } catch (error) {
    console.error('Error extracting code:', error);
    return '';
  }
}