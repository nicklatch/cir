<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class DriverController extends Controller
{
    /**
     * Display a listing of the drivers.
     */
    public function index(): Response
    {
        $drivers = Cache::remember('drivers', 120, fn () => Driver::orderBy('last_name', 'asc')->toBase()->get());

        return Inertia::render('drivers/index', [
            'drivers' => $drivers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
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
        Cache::put('drivers', Driver::orderBy('last_name', 'asc')->toBase()->get());

        return str_contains($request->header('Referer'), 'registration')
            ? to_route('registration')
            : to_route('drivers');
    }

    /**
     * Display the specified resource.
     */
    public function show(Driver $driver): Response
    {
        return Inertia::render('drivers/show', ['driver' => $driver]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Driver $driver): void
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone_number' => 'required|string|min:10|max:11',
            'car_number' => 'required|string|min:1|max:5',
            'drive_type' => 'required|string|max:3',
        ]);

        $driver->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'phone_number' => $request->phone_number,
            'car_number' => $request->car_number,
            'drive_type' => $request->drive_type,

        ]);

        Cache::delete('drivers');
        Cache::put('drivers', fn () => Driver::orderBy('last_name', 'asc')->toBase()->get(), 120);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Driver $driver)
    {
        $driver->delete();
        Cache::delete('drivers');
        Cache::put('drivers', fn () => Driver::orderBy('last_name', 'asc')->toBase()->get(), 120);
    }
}
