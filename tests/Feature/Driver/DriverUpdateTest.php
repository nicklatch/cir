<?php

use App\Models\Driver;
use App\Models\User;

test('driver can be created', function () {
    $user = User::factory()->create();
    $driver = Driver::factory()->create();

    $updated_driver = [
        'id' => $driver->id,
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
