<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Driver>
 */
class DriverFactory extends Factory
{
    public static function parsePhone(string $phone): string
    {

        $phone2 = preg_replace('/[^0-9]/', '', $phone); // Remove all non-numers

        return substr($phone2, 2, 3).'-'.substr($phone2, 6, 3).'-'.substr($phone2, 10, 4);
    }

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
            'car_number' => fake()->randomDigitNotZero().strval(fake()->randomDigitNotZero()), // TODO:
            'drive_type' => 'FWD',
        ];
    }

    public function rwd(): static
    {
        return $this->state(fn (array $attributes) => ['drive_type' => 'RWD']);
    }
}
