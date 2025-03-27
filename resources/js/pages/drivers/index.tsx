import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { Driver, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreVertical, Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Drivers',
        href: '/drivers',
    },
];

interface IndexProps {
    drivers: Array<Driver>
};

function CreateDriverButton() {
    return (
        <div className='flex justify-center md:ml-auto md:mt-0 mt-4'>
            <Button variant='outline' asChild>
                <Link href="drivers/create"><Plus />Create a new driver</Link>
            </Button>
        </div>
    )
}

const columns: Array<ColumnDef<Driver>> = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'car_number',
        accessorKey: "car_number",
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Car #
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const val: string = row.getValue('car_number');
            return (
                <div className='pl-3'>{val}</div>
            )
        }
    },
    {
        id: 'drive_type',
        accessorKey: "drive_type",
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Drive Type
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const val: string = row.getValue('drive_type');
            return (
                <div className='pl-3'>{val}</div>
            )
        }
    },
    {
        id: 'first_name',
        accessorKey: "first_name",
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    First Name
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const val: string = row.getValue('first_name');
            return (
                <div className='pl-3'>{val}</div>
            )
        }
    },
    {
        id: "last_name",
        accessorKey: "last_name",
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Last Name
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const val: string = row.getValue('last_name');
            return (
                <div className='pl-3'>{val}</div>
            )
        }

    },
    {
        id: "phone_number",
        accessorKey: "phone_number",
        header: "Phone Number",
        cell: ({ row }) => {
            const phone: string = row.getValue('phone_number');
            return (<div> ({phone.slice(0, 3)}) {phone.slice(3, 6)}-{phone.slice(6, 10)} </div>)
        }
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const driver = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href={"drivers/" + driver.id}>
                                View Driver
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit Driver</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export default function DriversIndex({ drivers }: IndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div
                    className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 rounded-xl border md:min-h-min md:p-1 overflow-x-auto ">
                    <DataTable columns={columns} data={drivers} headerRowChildren={CreateDriverButton()} />
                </div>
            </div >
        </AppLayout >
    );
}
