<?php

use App\Http\Controllers\DriverController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::controller(DriverController::class)->group(function () {
        Route::get('drivers', 'index')
            ->name('drivers');
        Route::post('drivers/create', 'store')
            ->name('drivers.store');
        Route::get('drivers/{driver}', 'show')
            ->name('drivers.show');
    });

    Route::get('registration', function () {
        return Inertia::render('registration');
    })->name('registration');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
