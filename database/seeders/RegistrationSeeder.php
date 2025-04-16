<?php

namespace Database\Seeders;

use App\Models\Driver;
use App\Models\Registration;
use Illuminate\Database\Seeder;

class RegistrationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $drivers = Driver::all();

        foreach ($drivers as $driver) {
            Registration::factory()
                ->withWeek(1)
                ->withDriver($driver)
                ->create();
        }
    }
}
