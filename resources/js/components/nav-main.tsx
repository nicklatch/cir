import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Separator } from './ui/separator';

interface NavMainProps {
    quickItems: Array<NavItem>
    raceDayItems: Array<NavItem>
}

export function NavMain({ quickItems = [], raceDayItems = [] }: NavMainProps) {
    const page = usePage();
    return (
        <>
            <SidebarGroup className="px-2 py-0">
                <SidebarGroupLabel>Quick Views</SidebarGroupLabel>
                <SidebarMenu>
                    {quickItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={item.href === page.url}>
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroup>
            <Separator />
            <SidebarGroup className="px-2 py-0">
                <SidebarGroupLabel>
                    Race Day
                </SidebarGroupLabel>
                <SidebarMenu>
                    {raceDayItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={item.href === page.url}>
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroup>
        </>
    );
}
