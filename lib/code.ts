export async function extractCodeFromFilePath(path: string): Promise<string> {
  try {
    const response = await fetch(`/api/code?path=${encodeURIComponent(path)}`);
    if (!response.ok) throw new Error('Failed to fetch code');
    const data = await response.json();
    return data.content || '';
  } catch (error) {
    console.error('Error extracting code:', error);
    return '';
  }
}
