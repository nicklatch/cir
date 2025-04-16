<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRegistrationRequest;
use App\Models\Driver;
use App\Models\Registration;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class RegistrationController extends Controller
{
    /**
     * Display a listing of Registrations.
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
     * Store a newly created in storage.
     */
    public function store(StoreRegistrationRequest $request)
    {
        $validated = $request->safe();

        Registration::create([
            'driver_id' => $validated['driver']['id'],
            'week' => $validated['week'],
            'class' => $validated['race_class'],
            'draw_one' => $validated['draw_one'],
            'draw_two' => $validated['draw_two'],
            'draw_three' => $validated['draw_three'],
        ]);

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
     * Update the specified resource in storage.
     */
    public function update(StoreRegistrationRequest $request, Registration $registration)
    {
        $validated = $request->safe();

        $registration->update(['driver_id' => $validated['driver']['id'],
            'week' => $validated['week'],
            'class' => $validated['race_class'],
            'draw_one' => $validated['draw_one'],
            'draw_two' => $validated['draw_two'],
            'draw_three' => $validated['draw_three'],
        ]);

        return to_route('registration');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Registration $registration)
    {
        $registration->delete();

        return to_route('registration');
    }
}
