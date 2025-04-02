<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Driver>
 */
class DriverFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => fake()->firstNameMale(),
            'last_name' => fake()->lastName(),
            'phone_number' => fake()->numerify('##########'),
            'car_number' => fake()->randomDigitNotZero().strval(fake()->randomDigitNotZero()),
            'drive_type' => fake()->randomElement(['FWD', 'RWD']),
        ];
    }

    public function rwd(): static
    {
        return $this->state(fn (array $attributes) => ['drive_type' => 'RWD']);
    }

    public function fwd(): static
    {
        return $this->state(fn (array $attributes) => ['drive_type' => 'FWD']);
    }
}
