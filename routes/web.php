<?php

use App\Http\Controllers\DriverController;
use App\Http\Controllers\RegistrationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Drivers
    Route::controller(DriverController::class)->group(function () {
        Route::get('drivers', 'index')
            ->name('drivers');
        Route::post('drivers/create', 'store')
            ->name('drivers.store');
        Route::get('drivers/{driver}', 'show')
            ->name('drivers.show');
        Route::put('drivers/{driver}', 'update')
            ->name('drivers.update');
    });

    // Registrations
    Route::controller(RegistrationController::class)->group(function () {
        Route::get('registration', 'index')
            ->name('registration');
        Route::get('registration/{registration}', 'show')
            ->name('registration.show');
        Route::post('registration/createDriver', 'storeNewDriver')
            ->name('registration.storeNewDriver');
        Route::post('registration/create', 'store')
            ->name('registration.store');
    });

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
