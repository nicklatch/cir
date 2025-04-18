<?php

namespace App\Services;

class WeatherService
{
    public static function index(): string
    {

        $client = new \GuzzleHttp\Client;

        $response = $client->request('GET', 'https://api.tomorrow.io/v4/weather/realtime?location=chetek&units=imperial&apikey='.ENV('WEATHER_API_KEY'), [
            'headers' => [
                'accept' => 'application/json',
                'accept-encoding' => 'deflate, gzip, br',
            ],
        ])->getBody();

        return $response->read($response->getSize());
    }
}
