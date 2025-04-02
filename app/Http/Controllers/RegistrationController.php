<?php

namespace App\Http\Controllers;

use App\Enums\RaceClass;
use App\Models\Registration;
use Illuminate\Http\Request;
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
        return Inertia::render('registration/index', [
            'registrations' => Registration::with('driver')
                ->whereRaw('CAST(strftime(\'%Y\', created_at) as INT) = ?', [now()->year])->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'driver_id' => 'requried|integer',
            'class' => Rule::enum(RaceClass::class),
            'draw_one' => [
                'required',
                'max:250',
                'min:1',
                Rule::unique('your_table_name')->where(function ($query) use ($request) {
                    return $query->where('week', $request->week)
                        ->whereRaw('YEAR(created_at) = ?', [now()->year]);
                }),
            ],
            'draw_two' => [
                'required',
                'max:250',
                'min:1',
                Rule::unique('your_table_name')->where(function ($query) use ($request) {
                    return $query->where('week', $request->week)
                        ->whereRaw('YEAR(created_at) = ?', [now()->year]);
                }),
            ],
            'draw_three' => [
                'nullable',
                'max:250',
                'min:1',
                Rule::unique('your_table_name')->where(function ($query) use ($request) {
                    return $query->where('week', $request->week)
                        ->whereRaw('YEAR(created_at) = ?', [now()->year]);
                }),
            ],
        ]);

        dd($request);
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
