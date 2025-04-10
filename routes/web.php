<?php

use App\Http\Controllers\DriverController;
use App\Http\Controllers\RegistrationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/login')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('drivers')->group(function () {
        Route::controller(DriverController::class)->group(function () {
            Route::get('', 'index')
                ->middleware('permission:view drivers')
                ->name('drivers');
            Route::get('/{driver}', 'show')
                ->middleware('permission:view drivers')
                ->name('drivers.show');
            Route::put('/{driver}', 'update')
                ->middleware('permission:edit drivers')
                ->name('drivers.update');
            Route::post('/create', 'store')
                ->middleware('permission:create drivers')
                ->name('drivers.store');
        });
    });

    Route::prefix('registration')->group(function () {
        Route::controller(RegistrationController::class)->group(function () {
            Route::get('', 'index')
                ->middleware('permission:view registrations')
                ->name('registration');
            Route::get('/{registration}', 'show')
                ->middleware('permission:view registrations')
                ->name('registration.show');
            // FIXME: This seems uneeded, just use drivers.store?
            Route::post('/createDriver', 'storeNewDriver')
                ->middleware('permission:create drivers')
                ->name('registration.storeNewDriver');
            Route::post('/create', 'store')
                ->middleware('permission:create registrations')
                ->name('registration.store');
        });
    });

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
