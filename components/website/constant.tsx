import preview from '@/assets/preview';

export const generateSidebarData = (dataArray: any[]) => {
  return dataArray.reduce((acc: any, item: any) => {
    const category = item.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});
};

// Your other constants
export const wordWrap = {
  name: 'word-wrap',
  className: 'whitespace-pre-wrap'
};

export const callout = {
  name: 'callout',
  className: 'relative'
};