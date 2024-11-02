import fs from 'fs/promises';
import path from 'path';

export async function extractCodeFromFilePath(filepath: string): Promise<string> {
  try {
    // Handle both registry and direct paths
    const fullPath = filepath.startsWith('registry/') 
      ? path.join(process.cwd(), filepath)
      : path.join(process.cwd(), 'registry', filepath);

    // Read the file directly
    const content = await fs.readFile(fullPath, 'utf-8');
    
    if (!content) {
      console.log('No content found for:', filepath);
      return '';
    }

    return content;
  } catch (error) {
    console.log('Error reading file:', filepath, error);
    return '';
  }
}