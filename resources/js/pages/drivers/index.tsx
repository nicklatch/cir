import { DataTable } from '@/components/data-table';
import DriverForm from '@/components/form-create-driver';
import UpdateDriverForm from '@/components/form-update-driver';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { formatPhone } from '@/lib/utils';
import { Driver, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Plus, SquareArrowOutUpRight } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Drivers',
        href: '/drivers',
    },
];


interface CreateDriverDialogProps {
    postRoute?: string
    tabIndex: number
}
export function CreateDriverDialog({ postRoute, tabIndex }: CreateDriverDialogProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <Dialog onOpenChange={() => setIsDialogOpen(!isDialogOpen)} open={isDialogOpen}>
            <DialogTrigger tabIndex={tabIndex} className='ml-auto' asChild>
                <Button variant="outline">{<Plus />} Create Driver</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Driver</DialogTitle>
                    <DialogDescription>
                        Add a new driver here. Click "Create Driver" when you're done.
                    </DialogDescription>
                </DialogHeader>
                <DriverForm postRoute={postRoute} onFinishCloseDialog={setIsDialogOpen} />
            </DialogContent>
        </Dialog>
    )
}

interface DriverRowActionsProps {
    driver: Driver
}
function DriverRowActions({ driver }: DriverRowActionsProps) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    return (
        <div className='flex'>
            <Button variant='ghost' className='p-0 m-0' asChild>
                <Link href={'drivers/' + driver.id}>
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
                            Edit the driver here. Click "Save Driver" when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <UpdateDriverForm onFinishCloseDialog={setIsEditDialogOpen} driver={driver} />
                </DialogContent>
            </Dialog >
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
            if (val == 'FWD') {
                return <Badge className='ml-3'>{val}</Badge>
            } else {
                return <Badge className='ml-3 bg-red-600 text-white'>{val}</Badge>
            }
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
            return formatPhone(row.getValue('phone_number'));
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const driver = row.original;

            return (
                <DriverRowActions driver={driver} />
            )
        },
    },
]

interface IndexProps {
    drivers: Array<Driver>
};
export default function DriversIndex({ drivers }: IndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div
                    className="">
                    <DataTable
                        columns={columns}
                        data={drivers}
                        headerRowChildren={<CreateDriverDialog />} />
                </div>
            </div>
        </AppLayout >
    );
}
