<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Registration extends Model
{
    /** @use HasFactory<\Database\Factories\RegistrationFactory> */
    use HasFactory;

    protected $fillable = [
        'driver_id',
        'class',
        'draw_one',
        'draw_two',
        'draw_three',
    ];

    public function drver(): BelongsTo
    {
        return $this->belongsTo(Driver::class);
    }
}
