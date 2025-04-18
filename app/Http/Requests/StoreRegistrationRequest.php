<?php

namespace App\Http\Requests;

use App\Enums\RaceClass;
use App\Models\Driver;
use Illuminate\Database\Query\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class StoreRegistrationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(Request $request): array
    {
        $driver = Driver::findOrFail($request->driver['id']);

        return [
            'driver' => 'required',
            'race_class' => [
                Rule::unique('registrations', 'class')
                    ->where(fn(Builder $query) => $query
                        ->where('week', $request->week)
                        ->where('driver_id', $driver->id)
                        ->whereYear('created_at', now()->year)),
                Rule::enum(RaceClass::class),
            ],
            'week' => 'required|integer|min:1|max:10',
            'draw_one' => [
                'required',
                'max:250',
                'min:1',
                'different:draw_two',
                'different:draw_three',
                Rule::unique('registrations')
                    ->where(fn(Builder $query) => $query->where('week', $request->week)
                        ->whereYear('created_at', now()->year)),
            ],
            'draw_two' => [
                'required',
                'max:250',
                'min:1',
                'different:draw_one',
                'different:draw_three',
                Rule::unique('registrations')
                    ->where(fn(Builder $query) => $query->where('week', $request->week)
                        ->whereYear('created_at', now()->year)),
            ],
            'draw_three' => [
                'nullable',
                'max:250',
                'min:1',
                'different:draw_one',
                'different:draw_two',
                Rule::unique('registrations')
                    ->where(fn(Builder $query) => $query->where('week', $request->week)
                        ->whereYear('created_at', now()->year)),
            ],
        ];
    }
}
