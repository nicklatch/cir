import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Driver, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Drivers',
        href: '/drivers'
    }
];

interface DriverProps {
    driver: Driver
}

export default function Show({ driver }: DriverProps) {
    breadcrumbs.push({
        title: driver.first_name + " " + driver.last_name,
        href: '/drivers/' + driver.id
    })

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <ul>
                        <li>{driver.id}</li>
                        <li><strong>Car Number: </strong>{driver.car_number}</li>
                        <li><strong>First Name: </strong>{driver.first_name}</li>
                        <li><strong>Last Name: </strong>{driver.last_name}</li>
                        <li><strong>Phone Number: </strong>{driver.phone_number}</li>
                        <li><strong>Drive Type: </strong>{driver.drive_type}</li>
                    </ul>
                </div>
            </div>
        </AppLayout>
    );
}
