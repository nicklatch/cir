<?php

namespace Database\Factories;

use App\Models\Driver;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Registration>
 */
class RegistrationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $driver = Driver::factory()->create();

        return [
            'driver_id' => $driver,
            'class' => static::genCorrectClass($driver),
            'week' => fake()->numberBetween(1, 10),
            'draw_one' => fake()->numberBetween(1, 250),
            'draw_two' => fake()->numberBetween(1, 250),
            'draw_three' => fake()->numberBetween(1, 250),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

    public function withWeek(int $week): static
    {
        return $this->state(fn (array $attributes) => ['week' => $week]);
    }

    private static function genCorrectClass(Driver $driver): string
    {
        if ($driver->drive_type == 'FWD') {
            return fake()->randomElement(['open', 'fwd_rubber']);
        } else {
            return fake()->randomElement(['open', 'rwd_rubber']);
        }
    }
}
