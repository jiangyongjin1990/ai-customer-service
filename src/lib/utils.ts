import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * @description 合并类名的工具函数，结合了clsx和tailwind-merge
 * @param {...ClassValue[]} inputs - 要合并的类名数组
 * @returns {string} 合并后的类名字符串
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 