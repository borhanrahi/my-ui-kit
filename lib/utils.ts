import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce(
  func: (...args: any[]) => any,
  wait: number,
  immediate: boolean = false
) {
  let timeout: number | undefined;

  return function executedFunction(this: any, ...args: any[]) {
    const context: any = this;

    const later = () => {
      timeout = undefined;
      if (!immediate) {
        func.apply(context, args);
      }
    };

    const callNow: boolean = immediate && !timeout;

    clearTimeout(timeout);

    timeout = window.setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
}

export function throttle(fn: (...args: any[]) => any, wait: number) {
  let shouldWait = false;

  return function throttledFunction(this: any, ...args: any[]) {
    if (!shouldWait) {
      fn.apply(this, args);
      shouldWait = true;
      setTimeout(() => (shouldWait = false), wait);
    }
  };
}

export const siteConfig = {
  name: 'my-ui-kit',
  url: 'https://my-ui-kit.vercel.app/',
  description:
    'An open-source starter repo',
  links: {
    twitter: 'https://x.com/borhan_rahi',
    linkedin: 'https://www.linkedin.com/in/borhanrahi/',
    github: 'https://github.com/borhanrahi',
  },
};

export type SiteConfig = typeof siteConfig;

export async function extractCodeFromFilePath(filepath: string) {
  try {
    const response = await fetch(`/api/code?file=${encodeURIComponent(filepath)}`, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    
    if (!response.ok) {
      console.error('Failed to fetch code:', response.statusText);
      return '';
    }
    
    const data = await response.json();
    return data.code;
  } catch (error) {
    console.error('Error fetching code:', error);
    return '';
  }
}
