<?php

use Database\Seeders\RoleSeeder;
use Database\Seeders\UserSeeder;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

beforeEach(function (): void {
    app()->make(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();
    seed(RoleSeeder::class);
    seed(UserSeeder::class);
});
