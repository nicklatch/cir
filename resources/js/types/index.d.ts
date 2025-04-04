import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export type Driver = {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    car_number: string;
    drive_type: string;
}

export type Registration = {
    id: number;
    driver: Driver;
    class: 'open' | 'fwd_rubber' | 'rwd_rubber' | 'powder_puff' | 'young_guns' | 'studs';
    week: number;
    draw_one: number;
    draw_two: number;
    draw_three: number;
}
