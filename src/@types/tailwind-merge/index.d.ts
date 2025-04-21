/**
 * tailwind-merge类型声明
 */
declare module 'tailwind-merge' {
  export function twMerge(...classes: string[]): string;
  export function twJoin(...classes: string[]): string;
  export const extendTailwindMerge: any;
  export const getDefaultConfig: any;
  export const validators: any;
}
