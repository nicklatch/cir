import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function replaceAt(string: string, index: number, replacement: string): string {
    return string.substring(0, index) + replacement + string.substring(index + replacement.length);
}
