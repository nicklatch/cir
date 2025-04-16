<?php

namespace App\Services;

use App\Models\Registration;
use Illuminate\Database\Eloquent\Collection;

class LineupService
{
    /**
     * Returns generated heat lineups for all classes based on the given `$draw_number`
     */
    public static function generateHeatLineUp(string $draw_number, int $chunk_by = 6)
    {
        // FIXME: For some reason, group by from the database will only return
        // one row of each group
        $by_class = Registration::with('driver:id,first_name,last_name,car_number,drive_type')
            ->orderBy($draw_number, 'asc')
            ->get()
            ->groupBy('class')
            ->map(function (Collection $race_class, string $key) use ($chunk_by) {
                return $race_class
                    ->chunk($chunk_by)
                    ->map(fn ($chunk) => $chunk->values());
            });
    }
}
