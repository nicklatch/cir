import { DataTable } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Driver, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, SquareArrowOutUpRight } from 'lucide-react';
import React, { useState } from 'react';

export type Registration = {
    id: number;
    driver: Driver;
    class: 'open' | 'fwd_rubber' | 'rwd_rubber' | 'powder_puff' | 'young_guns' | 'studs';
    week: number;
    draw_one: number;
    draw_two: number;
    draw_three: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Registration',
        href: '/registration',
    },
];

const columns: Array<ColumnDef<Registration>> = [
    {
        id: "select",
        header: ({ table }) => (
            <div className='flex items-center'>            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
            </div>

        ),
        cell: ({ row }) => (
            <div className='flex items-center'>
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>

        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "week",
        header: "Week",
    },
    {
        accessorKey: "driver.last_name",
        header: "Last Name",
        cell: ({ row }) => {
            return row.original.driver.last_name;
        }
    }, {
        accessorKey: "class",
        header: "Class",
        cell: ({ row }) => {
            const raceClass = row.original.class
                .replace("wd", "WD")
                .replace(/^./, (c) => c.toUpperCase())
                .replace(/_(.)/, (_, c) => ` ${c.toUpperCase()}`)

            switch (raceClass) {
                case 'RWD Rubber':
                    return <Badge>{raceClass}</Badge>;
                case 'FWD Rubber':
                    return <Badge className='bg-orange-600 text-white'>{raceClass}</Badge>
                case 'Open':
                    return <Badge className='bg-green-600 text-white'>{raceClass}</Badge>
                case 'Powder Puff':
                    return <Badge className='bg-pink-600 text-white'>{raceClass}</Badge>
                case 'Young Guns':
                    return <Badge className='bg-blue-600 text-white'>{raceClass}</Badge>

            }
        }
    },
    {
        accessorKey: "draw_one",
        header: "Draw 1",
    },
    {
        accessorKey: "draw_two",
        header: "Draw 2",
    },
    {
        accessorKey: "draw_three",
        header: "Draw 3",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const registration = row.original;

            return (
                <RegistrationRowActions registration={registration} />
            )
        },
    }
]

interface RegistrationRowActionsProps {
    registration: Registration
}

function RegistrationRowActions({ registration }: RegistrationRowActionsProps) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    return (
        <div className='flex'>
            <Button variant='ghost' className='p-0 m-0' asChild>
                <Link href={'registration/' + registration.id}>
                    <SquareArrowOutUpRight />
                </Link>
            </Button>
            <Dialog onOpenChange={() => setIsEditDialogOpen(!isEditDialogOpen)} open={isEditDialogOpen}>
                <DialogTrigger className='ml-auto' asChild>
                    <Button variant="ghost" className='p-0 m-0'><Edit /></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Driver</DialogTitle>
                        <DialogDescription>
                            Edit the registration entry here. Click "Save Registration" when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    Some stuff
                </DialogContent>
            </Dialog >
        </div>
    )
}



function RegistrationIndexTableHeaderChildren() {
    return (
        <div className='ml-auto'>
            <Select >
                <SelectTrigger>
                    <SelectValue placeholder='Select a season' />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='2025'>2025</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

interface RegistrationIndexProps {
    registrations: Array<Registration>
};

export default function RegistrationIndex({ registrations }: RegistrationIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">

                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 rounded-xl border md:min-h-min md:p-1 overflow-x-auto ">
                    <DataTable columns={columns} data={registrations} headerRowChildren={<RegistrationIndexTableHeaderChildren />} />
                </div>
            </div>
        </AppLayout>
    );
}
