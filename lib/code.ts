export const extractCodeFromFilePath = async (filePath: string) => {
  try {
    const response = await fetch(`/api/code?path=${filePath}`);
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('Error fetching code:', error);
    return '';
  }
};
