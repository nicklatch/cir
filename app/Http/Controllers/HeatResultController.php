<?php

namespace App\Http\Controllers;

use App\Models\Heat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HeatResultController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Inertia\Response
    {
        return Inertia::render('heat-results/index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Heat $heat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Heat $heat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Heat $heat)
    {
        //
    }
}
