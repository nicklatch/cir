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
    $driver = [
        'first_name' => 'Test',
        'last_name' => 'Driver',
        'phone_number' => '5558675309',
        'car_number' => '99',
        'drive_type' => 'FWD',
    ];

    $response = $this
        ->actingAs($user)
        ->post('/drivers/create', $driver);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/drivers');

    $created_driver = Driver::where('first_name', 'Test')->get()->first();

    expect($created_driver->first_name)->toBe('Test');
    expect($created_driver->last_name)->toBe('Driver');
    expect($created_driver->phone_number)->toBe('5558675309');
    expect($created_driver->car_number)->toBe('99');
    expect($created_driver->drive_type)->toBe('FWD');
});
