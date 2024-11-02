export async function extractCodeFromFilePath(path: string): Promise<string> {
  try {
    // For local development, use relative path
    if (process.env.NODE_ENV === 'development') {
      const response = await fetch(`/api/code?path=${encodeURIComponent(path)}`);
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      return data.content || '';
    }

    // For production (Vercel)
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL 
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` 
      : process.env.NEXT_PUBLIC_APP_URL;

    if (!baseUrl) {
      throw new Error('No base URL configured');
    }

    const response = await fetch(`${baseUrl}/api/code?path=${encodeURIComponent(path)}`, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch code: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.content || '';
  } catch (error: unknown) {
    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error extracting code:', {
        message: error.message,
        path,
        env: process.env.NODE_ENV,
        vercelUrl: process.env.NEXT_PUBLIC_VERCEL_URL
      });
    } else {
      console.error('Unknown error occurred while extracting code:', error);
    }
    return '';
  }
}