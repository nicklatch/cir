<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRegistrationRequest;
use App\Models\Driver;
use App\Models\Registration;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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

    public function storeNewDriver(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone_number' => 'required|string|min:10|max:11',
            'car_number' => 'required|string|min:1|max:5',
            'drive_type' => 'required|string|size:3',
        ]);

        Driver::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'phone_number' => $validated['phone_number'],
            'car_number' => $validated['car_number'],
            'drive_type' => $validated['drive_type'],
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
