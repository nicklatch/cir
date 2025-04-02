<?php

namespace App\Enums;

enum RaceClass: string
{
    case Open = 'open';
    case FwdRubber = 'fwd_rubber';
    case RwdRubber = 'rwd_rubber';
    case PowderPuff = 'powder_puff';
    case YoungGuns = 'young_guns';

    public static function values(): array
    {
        $result = [];
        foreach (self::cases() as $class) {
            array_push($result, $class->value);
        }

        return $result;
    }
}
