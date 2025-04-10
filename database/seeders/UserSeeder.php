<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $role_super_admin = Role::findByName('Super-Admin');
        $role_promoter = Role::findByName('promoter');
        $role_crew = Role::findByName('crew');

        $user_sa = User::factory()->create([
            'first_name' => 'Super',
            'last_name' => 'Admin',
            'email' => 'super@example.com',
        ]);
        $user_sa->assignRole($role_super_admin);

        $user_promoter = User::factory()->create([
            'first_name' => 'Promoter',
            'last_name' => 'User',
            'email' => 'promoter@example.com',
        ]);
        $user_promoter->assignRole($role_promoter);

        $user_crew = User::factory()->create([
            'first_name' => 'Crew',
            'last_name' => 'User',
            'email' => 'crew@example.com',
        ]);
        $user_crew->assignRole($role_crew);

        User::factory()->create([
            'first_name' => 'Roleless',
            'last_name' => 'User',
            'email' => 'roleless@example.com',
        ]);

    }
}
