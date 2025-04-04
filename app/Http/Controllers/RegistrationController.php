<?php

namespace App\Http\Controllers;

use App\Enums\RaceClass;
use App\Models\Driver;
use App\Models\Registration;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class RegistrationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $drivers = Cache::remember('drivers', 120, function () {
            return Driver::orderBy('last_name', 'asc')->toBase()->get();
        });

        return Inertia::render('registration/index', [
            'registrations' => Registration::with('driver')
                ->whereYear('created_at', now()->year)->get(),
            'drivers' => $drivers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $vals = $request->validate([
            'driver' => 'required',
            'class' => Rule::enum(RaceClass::class),
            'week' => 'required|integer|min:1|max:10',
            'draw_one' => [
                'required',
                'max:250',
                'min:1',
                'different:draw_two',
                'different:draw_three',
                Rule::unique('registrations')
                    ->where(function (Builder $query) use ($request) {
                        return $query->where('week', $request->week)
                            ->whereYear('created_at', now()->year);
                    }),
            ],
            'draw_two' => [
                'required',
                'max:250',
                'min:1',
                'different:draw_one',
                'different:draw_three',
                Rule::unique('registrations')
                    ->where(function (Builder $query) use ($request) {
                        return $query->where('week', $request->week)
                            ->whereYear('created_at', now()->year);
                    }),
            ],
            'draw_three' => [
                'nullable',
                'max:250',
                'min:1',
                'different:draw_one',
                'different:draw_two',
                Rule::unique('registrations')
                    ->where(function (Builder $query) use ($request) {
                        return $query->where('week', $request->week)
                            ->whereYear('created_at', now()->year);
                    }),
            ],
        ]);

        Registration::create([
            'driver_id' => $request->driver['id'],
            'week' => $request->week,
            'class' => $request->raceClass,
            'draw_one' => $request->draw_one,
            'draw_two' => $request->draw_two,
            'draw_three' => $request->draw_three,
        ]);

        return to_route('registration');
    }

    public function storeNewDriver(Request $request): RedirectResponse
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone_number' => 'required|string|min:10|max:11',
            'car_number' => 'required|string|min:1|max:5',
            'drive_type' => 'required|string|size:3',
        ]);

        Driver::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'phone_number' => $request->phone_number,
            'car_number' => $request->car_number,
            'drive_type' => $request->drive_type,
        ]);

        // TODO: Is there a way to invalidate or update a value?

        Cache::delete('drivers');
        Cache::put('drivers', Driver::toBase()->get());

        return to_route('registration');
    }

    /**
     * Display the specified resource.
     */
    public function show(Registration $registration)
    {
        return Inertia::render('registration/show', [
            'registration' => $registration,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Registration $registration)
    {
        //
    }

    /** sf
     * Update the specified resource in storage.
     */
    public function update(Request $request, Registration $registration)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Registration $registration)
    {
        //
    }
}
