<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DriverController extends Controller
{
    /**
     * Display a listing of the drivers.
     */
    public function index()
    {
        return Inertia::render('drivers/index', [
            'drivers' => Driver::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone_number' => 'required|string|min:10|max:11',
            'car_number' => 'required|string|min:1|max:5',
            'drive_type' => 'required|string|max:3',
        ]);

        Driver::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'phone_number' => $request->phone_number,
            'car_number' => $request->car_number,
            'drive_type' => $request->drive_type,
        ]);

        // TODO: display some sort of toast message showing conformation, event?

        return to_route('drivers');
    }

    /**
     * Display the specified resource.
     */
    public function show(Driver $driver)
    {
        return Inertia::render('drivers/show', ['driver' => $driver]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Driver $driver)
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
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Driver $driver)
    {
        //
    }
}
