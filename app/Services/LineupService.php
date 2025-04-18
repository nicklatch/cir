<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Registration;
use Illuminate\Support\Collection;

final class LineupService
{
    /**
     * Returns generated heat lineups for all classes based on the given `$draw_number`
     *
     * @param  Collection<int, Registration>  $registrations
     * @return Collection<string, Collection<int, Collection<int, Registration>>>
     */
    public static function generateHeatLineUp(Collection $registrations, int $chunk_by = 6): Collection
    {
        return $registrations
            ->groupBy('class')
            ->map(fn (Collection $race_class, string $_key) => $race_class
                ->chunk($chunk_by)
                ->map(fn ($chunk) => $chunk->values()));
    }

    /**
     * Returns Registrations with needed Driver fields by the
     * given week and then ordered by the given draw number
     *
     * @return Collection<int, Registration>
     */
    public static function getByWeekOrderByDraw(string $draw_number, int $week): Collection
    {
        return Registration::query()
            ->with('driver:id,first_name,last_name,car_number,drive_type')
            ->where('week', '=', $week)
            ->orderBy($draw_number, 'asc')
            ->get();
    }
}
