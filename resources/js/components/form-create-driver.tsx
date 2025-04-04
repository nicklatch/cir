import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import InputError from "./input-error";
import { toast } from "sonner";
import { useForm } from "@inertiajs/react";
import { Dispatch, FormEventHandler, SetStateAction } from 'react';
import { LoaderCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

type CreateDriverForm = {
    first_name: string;
    last_name: string;
    phone_number: string;
    car_number: string;
    drive_type: string;
}

interface CreateDriverFormProps {
    onFinishCloseDialog?: Dispatch<SetStateAction<boolean>>
    postRoute?: string
}

export default function DriverForm({ onFinishCloseDialog, postRoute }: CreateDriverFormProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<CreateDriverForm>>({
        first_name: '',
        last_name: '',
        phone_number: '',
        car_number: '',
        drive_type: '',
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        post(route(postRoute ?? 'drivers.store'), {
            onFinish: () => {
                toast("Driver Created", {
                    description: data.first_name + " " + data.last_name
                });
                reset('first_name', 'last_name', 'phone_number', 'car_number', 'drive_type');
                if (onFinishCloseDialog) onFinishCloseDialog(false);
            },
        });
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={submit}>
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
                <RadioGroup
                    id="drive_type"
                    className="flex justify-center p-2"
                    onValueChange={(val) => setData('drive_type', val)}
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="FWD" id="fwd" />
                        <Label htmlFor="fwd">FWD</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="RWD" id="rwd" />
                        <Label htmlFor="rwd">RWD</Label>
                    </div>
                </RadioGroup>
                <InputError message={errors.drive_type} className="mt-2" />
            </div>

            <div className="flex items-baseline">
                <Button
                    type='submit'
                    className='mt-2 w-ful flex-1 h-full rounded-r-none rounded-l-md'
                    tabIndex={6}
                    disabled={processing}
                >
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Save Driver
                </Button>
                <Button
                    className='flex-1 rounded-l-none rounded-r-md h-full'
                    variant='destructive'
                    type='reset'
                    onClick={() => reset('first_name', 'last_name', 'phone_number', 'car_number', 'drive_type')}
                >
                    Clear
                </Button>
            </div>
        </form >
    )
}
