<?php

use App\Http\Controllers\DriverController;
use App\Http\Controllers\HeatLineupController;
use App\Http\Controllers\HeatResultController;
use App\Http\Controllers\RegistrationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/login')->name('home');

Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::get('dashboard', fn() => Inertia::render('dashboard'))->name('dashboard');

    Route::prefix('drivers')->group(function (): void {
        Route::controller(DriverController::class)->group(function (): void {
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

    Route::prefix('registration')->group(function (): void {
        Route::controller(RegistrationController::class)->group(function (): void {
            Route::get('', 'index')
                ->middleware('permission:view registrations')
                ->name('registration');
            Route::get('/{registration}', 'show')
                ->middleware('permission:view registrations')
                ->name('registration.show');
            Route::post('/create', 'store')
                ->middleware('permission:create registrations')
                ->name('registration.store');
        });
    });

    Route::prefix('heat-lineups')->group(function (): void {
        Route::controller(HeatLineupController::class)->group(function (): void {
            Route::get('', 'index')
                ->name('heat-lineups.index');
        });
    });

    Route::prefix('heat-results')->group(function (): void {
        Route::controller(HeatResultController::class)->group(function (): void {
            Route::get('', 'index')
                ->name('heat-results.index');
        });
    });

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
