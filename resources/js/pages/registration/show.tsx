import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Registration } from '.';
import { formatPhone, toTitleCase } from '@/lib/utils';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Registration',
        href: '/registration'
    },
];

interface RegistrationShowProps {
    registration: Registration
}

export default function RegistrationShow({ registration }: RegistrationShowProps) {

    if (breadcrumbs.length != 2) {
        breadcrumbs.push({
            title: "Week: " + registration.week + " | " + (registration.driver.first_name + " " + registration.driver.last_name) + " | " + toTitleCase(registration.class),
            href: '/registration/' + registration.id
        })
    }

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
                        <li><strong>ID: </strong> {registration.id}</li>
                        <li><strong>Week: </strong> {registration.week}</li>
                        <li><strong>Class: </strong>{toTitleCase(registration.class)}</li>
                        <li><strong>Car Number: </strong>{registration.driver.car_number}</li>
                        <li><strong>First Name: </strong>{registration.driver.first_name}</li>
                        <li><strong>Last Name: </strong>{registration.driver.last_name}</li>
                        <li><strong>Phone Number: </strong>{formatPhone(registration.driver.phone_number)}</li>
                        <li><strong>Drive Type: </strong>{registration.driver.drive_type}</li>
                    </ul>
                </div>
            </div>
        </AppLayout>
    );
}
