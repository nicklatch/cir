<?php

use App\Models\Driver;
use App\Models\User;
use Database\Seeders\RoleSeeder;
use Database\Seeders\UserSeeder;

use function Pest\Laravel\seed;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

beforeEach(function (): void {
    app()->make(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();
    seed(RoleSeeder::class);
    seed(UserSeeder::class);
});

test('driver can be created', function (): void {
    $user = User::where('first_name', 'Crew')->first();
    $driver = Driver::factory()->create();

    $updated_driver = [
        'first_name' => 'Tester',
        'last_name' => 'Driver',
        'phone_number' => $driver->phone_number,
        'car_number' => $driver->car_number,
        'drive_type' => $driver->drive_type,
    ];

    $response = $this
        ->actingAs($user)
        ->put('/drivers/'.$driver->id, $updated_driver);

    $response
        ->assertSessionHasNoErrors();

    $updated_driver = Driver::findOrFail($driver->id);

    expect($updated_driver->first_name)->toBe('Tester');
    expect($updated_driver->last_name)->toBe('Driver');
});
