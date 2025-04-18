<?php

namespace App\Http\Controllers;

use App\Models\Heat;
use App\Services\LineupService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HeatLineupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('heat-lineups/index', [
            'heats' => [
                'round_one_lineups' => LineupService::generateHeatLineUp('draw_one'),
                'round_two_lineups' => LineupService::generateHeatLineUp('draw_two'),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): void
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): void
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Heat $heat): void
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Heat $heat): void
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Heat $heat): void
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Heat $heat): void
    {
        //
    }
}
