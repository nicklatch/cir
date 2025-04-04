import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, User, NotepadText, Trophy, DollarSign, BookCheck, Grid2x2, Grid2x2Check, Logs } from 'lucide-react';
import AppLogo from './app-logo';

const quickNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Drivers',
        href: '/drivers',
        icon: User,
    },
    {
        title: 'Points',
        href: '/points',
        icon: Logs
    }
];

const raceDayNavItems: Array<NavItem> = [
    {
        title: "Registration",
        href: "/registration",
        icon: NotepadText,
    },
    {
        title: "Heat Lineups",
        href: "/heat-lineups",
        icon: Grid2x2,
    },
    {
        title: "Heat Results",
        href: "/heat-results",
        icon: BookCheck,
    },
    {
        title: "Feature Lineups",
        href: "/feature-lineups",
        icon: Grid2x2Check,
    },
    {
        title: "Feature Results",
        href: "/feature-results",
        icon: Trophy,
    },
    {
        title: "Payouts",
        href: "/payouts",
        icon: DollarSign
    }
]

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain quickItems={quickNavItems} raceDayItems={raceDayNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
