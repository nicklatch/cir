import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function replaceAt(string: string, index: number, replacement: string): string {
    return string.substring(0, index) + replacement + string.substring(index + replacement.length);
}

export function formatPhone(phone: string): string {
    return ("(" + phone.slice(0, 3) + ") " + phone.slice(3, 6)
        + "-" + phone.slice(6, 10))
}

export function toTitleCase(str: string): string {
    return str
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
