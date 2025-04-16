<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Heat extends Model
{
    /** @use HasFactory<\Database\Factories\HeatFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'registration_id',
        'start_position',
        'finish_position',
    ];

    /**
     * Returns the Registration associated with the Heat
     *
     * @return BelongsTo<Registration, $this>
     */
    public function registration(): BelongsTo
    {
        return $this->belongsTo(Registration::class);
    }
}
