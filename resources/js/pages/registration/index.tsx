import { DataTable } from '@/components/data-table';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Driver, Registration, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, LoaderCircle, SquareArrowOutUpRight } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { CreateDriverDialog } from '../drivers';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Registration',
        href: '/registration',
    },
];

enum RaceClass {
    Open = 'open',
    FwdRubber = 'fwd_rubber',
    RwdRubber = 'rwd_rubber',
    PowderPuff = 'powder_puff',
    YoungGuns = 'young_guns',
    Studs = 'studs'
}

type CreateRegistrationForm = {
    week: number | undefined;
    driver: Driver | undefined;
    raceClass: RaceClass | undefined;
    draw_one: number | undefined;
    draw_two: number | undefined;
    draw_three: number | undefined;
}

function FwdClassSelectItems() {
    return (
        <SelectContent>
            <SelectItem key='open' value={RaceClass.Open}>Open</SelectItem>
            <SelectItem key='fwd_rubber' value={RaceClass.FwdRubber}>FWD Rubber</SelectItem>
        </SelectContent>
    )
}

function RwdClassSelectItems() {
    return (
        <SelectContent>
            <SelectItem key='open' value={RaceClass.Open}>Open</SelectItem>
            <SelectItem key='rwd_rubber' value={RaceClass.RwdRubber}>RWD Rubber</SelectItem>
            <SelectItem key='studs' value={RaceClass.Studs}>Studs</SelectItem>
        </SelectContent>
    )
}

interface CreateRegistrationFormProps {
    drivers: Array<Driver>
}
function CreateRegistrationForm({ drivers }: CreateRegistrationFormProps) {
    const { data, setData, clearErrors, post, processing, errors, reset } = useForm<Required<CreateRegistrationForm>>({
        week: undefined,
        driver: undefined,
        raceClass: undefined,
        draw_one: undefined,
        draw_two: undefined,
        draw_three: undefined
    });

    const [driveType, setDriveType] = useState(data.driver?.drive_type);
    const [selectRenderKey, setSelectRenderKey] = useState(+new Date());
    const altRenderKey = (prefix: string) => prefix + selectRenderKey;


    const submitRegistration: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('registration.store'), {
            onSuccess: () => {
                toast("Driver Registered", { description: data.driver?.first_name + " " + data.driver?.last_name });
                reset('week', 'driver', 'raceClass', 'draw_one', 'draw_two', 'draw_three');
            }
        })
    }

    useEffect(() => {
        setDriveType(data.driver?.drive_type);
    }, [data.driver?.drive_type])

    return (
        <form className='p-2' onSubmit={submitRegistration}>
            <div>
                <Label htmlFor='week'>Week</Label>
                <Select
                    key={selectRenderKey}
                    required
                    onValueChange={(val) => {
                        setData('week', Number(val));
                    }}>
                    <SelectTrigger
                        id='week'
                        autoFocus
                        tabIndex={1}
                    >
                        <SelectValue placeholder='Select the current week' />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                                <SelectItem value={String(n)}>{n}</SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
                <InputError message={errors.week} />
            </div>
            <div>
                <Label htmlFor='driver'>Driver</Label>
                <div className='flex'>
                    <Select
                        key={altRenderKey('driver')}
                        required
                        onValueChange={(val) => setData('driver', drivers.filter((driver) => driver.id == Number(val))[0])}
                    >
                        <SelectTrigger
                            id='driver'
                            autoFocus
                            tabIndex={2}
                        >
                            <SelectValue placeholder='Select a driver' />
                        </SelectTrigger>
                        <SelectContent >
                            {
                                drivers.map((driver) => {
                                    return (
                                        <SelectItem key={driver.id} value={String(driver.id)}>
                                            ({driver.car_number}) {driver.last_name + ", " + driver.first_name}
                                        </SelectItem>
                                    )
                                })
                            }
                        </SelectContent>
                    </Select>
                    <CreateDriverDialog tabIndex={3} postRoute='registration.storeNewDriver' />
                </div>
                <InputError message={errors.driver} />
            </div>
            <div>
                <Label htmlFor='class'>Class</Label>
                <Select key={altRenderKey('driver')} onValueChange={(val) => setData('raceClass', val as RaceClass)}>
                    <SelectTrigger
                        id='class'
                        autoFocus
                        tabIndex={4}
                    >
                        <SelectValue placeholder='Select a class' />
                    </SelectTrigger>
                    <SelectContent>
                        {driveType == 'FWD' ? <FwdClassSelectItems /> : <RwdClassSelectItems />}
                    </SelectContent>
                </Select>
                <InputError message={errors.raceClass} />
            </div>
            <div className='flex gap-2'>
                <div className='flex-1'>
                    <Label htmlFor='draw_one'>Draw One</Label>
                    <Input
                        id='draw_one'
                        type='number'
                        required
                        autoFocus
                        min={1}
                        max={250}
                        tabIndex={5}
                        onChange={(e) => setData('draw_one', Number(e.target.value))}
                        disabled={processing}
                        placeholder='First Draw'

                    />
                    <InputError message={errors.draw_one} />
                </div>
                <div className='flex-1'>
                    <Label htmlFor='draw_two'>Draw Two</Label>
                    <Input
                        id='draw_two'
                        type='number'
                        required
                        autoFocus
                        min={1}
                        max={250}
                        tabIndex={6}
                        onChange={(e) => setData('draw_two', Number(e.target.value))}
                        disabled={processing}
                        placeholder='Second Draw'
                    />
                    <InputError message={errors.draw_two} />
                </div>
                <div className='flex-1'>
                    <Label htmlFor='draw_three'>Draw Three</Label>
                    <Input
                        id='draw_three'
                        type='number'
                        required
                        autoFocus
                        min={1}
                        max={250}
                        tabIndex={7}
                        onChange={(e) => setData('draw_three', Number(e.target.value))}
                        disabled={processing}
                        placeholder='Third Drawn'
                    />
                    <InputError message={errors.draw_three} />
                </div>
            </div>
            <div className='pt-3 flex justify-center items-center'>
                <Button
                    type='submit'
                    className='flex-1 h-full rounded-r-none rounded-l-md'
                    onClick={() => console.log(data)}
                    tabIndex={8}
                    disabled={processing}
                >
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Register Driver
                </Button>
                <Button
                    className='flex-1 rounded-l-none rounded-r-md h-full'
                    tabIndex={9}
                    variant='destructive'
                    onClick={() => {
                        setSelectRenderKey(+new Date());
                        clearErrors();
                    }}
                    type='reset'
                >
                    Clear
                </Button>
            </div>
        </form>
    )
}

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
        header: 'Week',
        meta: {
            filterVarient: 'range'
        }
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

interface RegistrationIndexProps {
    registrations: Array<Registration>
    drivers: Array<Driver>
};

export default function RegistrationIndex({ registrations, drivers }: RegistrationIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border overflow-y-auto">
                        <CreateRegistrationForm drivers={drivers} />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 rounded-xl border md:min-h-min md:p-1 overflow-x-auto ">
                    <DataTable columns={columns} data={registrations} />
                </div>
            </div>
        </AppLayout>
    );
}
