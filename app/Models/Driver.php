<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Driver extends Model
{
    /** @use HasFactory<\Database\Factories\DriverFactory> */
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'phone_number',
        'car_number',
        'drive_type',
    ];

    public function registrations(): HasMany
    {
        return $this->hasMany(Registration::class);
    }
}
