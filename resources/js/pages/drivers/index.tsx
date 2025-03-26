import { DataTable } from '@/components/data-table';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
//import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Driver, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Drivers',
        href: '/drivers',
    },
];

interface IndexProps {
    drivers: Array<Driver>
};

const columns: Array<ColumnDef<Driver>> = [
    {
        accessorKey: "car_number",
        header: "Car Number",
    },
    {
        accessorKey: "drive_type",
        header: "Driver Type"
    },
    {
        accessorKey: "first_name",
        header: "First Name"
    },
    {
        accessorKey: "last_name",
        header: "Last Name"
    },
    {
        accessorKey: "phone_number",
        header: "Phone Number"
    }
]

export default function Index({ drivers }: IndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <div className="flex justify-center items-center absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" >
                            <Button className='max-w-1/2' asChild>
                                <TextLink href={route('drivers.create')}>Create a new driver</TextLink>
                            </Button>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div
                    className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 rounded-xl border md:min-h-min md:p-2 overflow-x-auto ">
                    <DataTable columns={columns} data={drivers} />
                </div>
            </div >
        </AppLayout >
    );
}

