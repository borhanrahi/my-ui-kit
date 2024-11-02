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

// Add this export along with the existing generateSidebarData function
export const CardArr = [
  {
    img: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop',
    title: 'Nike Air1',
    color: '#202020',
  },
  {
    img: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=800&auto=format&fit=crop',
    title: 'Nike Air2',
    color: '#23acfc',
  },
  {
    img: 'https://images.unsplash.com/photo-1520256862855-398228c41684?q=80&w=800&auto=format&fit=crop',
    title: 'Adidas',
    color: '#a3fcff',
  },
  {
    img: 'https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?q=80&w=800&auto=format&fit=crop',
    title: 'Brown Leather ',
    color: '#A4636C',
  },
];