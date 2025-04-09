<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Represents a Driver's Registration entry
 *
 * @property int $id
 * @property int $driver_id
 * @property string $class
 * @property int $week
 * @property int $draw_one
 * @property int $draw_two
 * @property int|null $draw_three
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Driver|null $driver
 *
 * @method static \Database\Factories\RegistrationFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Registration newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Registration newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Registration query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Registration whereClass($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Registration whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Registration whereDrawOne($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Registration whereDrawThree($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Registration whereDrawTwo($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Registration whereDriverId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Registration whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Registration whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Registration whereWeek($value)
 *
 * @mixin \Eloquent
 */
class Registration extends Model
{
    /** @use HasFactory<\Database\Factories\RegistrationFactory> */
    use HasFactory;

    protected $with = ['driver'];

    protected $fillable = [
        'driver_id',
        'week',
        'class',
        'draw_one',
        'draw_two',
        'draw_three',
    ];

    /**
    * Get's the Driver associated with the Registration
    */
    public function driver(): BelongsTo
    {
        return $this->belongsTo(Driver::class);
    }
}
