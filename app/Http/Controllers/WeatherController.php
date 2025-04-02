<?php

namespace App\Http\Controllers;

class WeatherController extends Controller
{
    public function index()
    {

        $client = new \GuzzleHttp\Client;

        $response = $client->request('GET', 'https://api.tomorrow.io/v4/weather/realtime?location=chetek&units=imperial&apikey='.ENV('WEATHER_API_KEY'), [
            'headers' => [
                'accept' => 'application/json',
                'accept-encoding' => 'deflate, gzip, br',
            ],
        ]);

        return $response->getBody();
    }
}
