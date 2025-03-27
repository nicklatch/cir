import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Drivers',
        href: '/drivers',
    },
    {
        title: 'Create Driver',
        href: '/drivers/create',
    },
];

// NOTE: This is different than the `@/types/Driver`
type CreateDriverForm = {
    first_name: string;
    last_name: string;
    phone_number: string;
    car_number: string;
    drive_type: string; // TODO: Either FWD or RWD, make this an enum
}

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<CreateDriverForm>>({
        first_name: '',
        last_name: '',
        phone_number: '',
        car_number: '',
        drive_type: '',
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('drivers.store'), {
            onFinish: () => {
                toast("Driver Created", {
                    description: data.first_name + " " + data.last_name
                });
                reset('first_name', 'last_name', 'phone_number', 'car_number', 'drive_type');
            },
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Driver" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className=
                    "border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="flex flex-col justify-center items-center absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20 p-6 ring-2" >
                        <form className="flex flex-col gap-6 md:max-w-2xl" onSubmit={submit}>
                            <div className="grid gap-2">
                                <Label htmlFor="first_name">First Name</Label>
                                <Input
                                    id="first_name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    value={data.first_name}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                    disabled={processing}
                                    placeholder='First Name'
                                />
                                <InputError message={errors.first_name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last_name">Last Name</Label>
                                <Input
                                    id="last_name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={2}
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                    disabled={processing}
                                    placeholder='Last Name'
                                />
                                <InputError message={errors.last_name} className="mt-2" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone_number">Phone Number</Label>
                                <Input
                                    id="phone_number"
                                    type="tel"
                                    required
                                    autoFocus
                                    tabIndex={3}
                                    value={data.phone_number}
                                    onChange={(e) => setData('phone_number', e.target.value)}
                                    disabled={processing}
                                    placeholder='555-555-5555'
                                />
                                <InputError message={errors.phone_number} className="mt-2" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="car_number">Car Number</Label>
                                <Input
                                    id="car_number"
                                    type="tel"
                                    required
                                    autoFocus
                                    tabIndex={4}
                                    value={data.car_number}
                                    onChange={(e) => setData('car_number', e.target.value)}
                                    disabled={processing}
                                    placeholder='X29'
                                />
                                <InputError message={errors.phone_number} className="mt-2" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="drive_type">Drive Type</Label>
                                <Input
                                    id="drive_type"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={5}
                                    value={data.drive_type}
                                    onChange={(e) => setData('drive_type', e.target.value)}
                                    disabled={processing}
                                    placeholder='FWD or RWD'
                                />
                                <InputError message={errors.drive_type} className="mt-2" />
                            </div>

                            <Button type='submit' className='mt-2 w-ful' tabIndex={6} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Create Driver
                            </Button>
                            <Button variant='destructive' type='reset' onClick={() => reset('first_name', 'last_name', 'phone_number', 'car_number', 'drive_type')}>Reset</Button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
