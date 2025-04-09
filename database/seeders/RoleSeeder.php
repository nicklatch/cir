<?php

namespace Database\Seeders;

use App\Enums\UserRoles;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        /*
        |--------------------------------------------------------------------------
        | Permissions
        |--------------------------------------------------------------------------
        |
        | NOTE: All permission follow the same naming format of $permission_<MODEL>_<ACTION>
        |
        */

        // Drivers
        $permission_drivers_create = Permission::create(['name' => 'create drivers']);
        $permission_drivers_view = Permission::create(['name' => 'view drivers']);
        $permission_drivers_edit = Permission::create(['name' => 'edit drivers']);
        $permission_drivers_delete = Permission::create(['name' => 'delete drivers']);

        // Registrations
        $permission_registration_create = Permission::create(['name' => 'create registrations']);
        $permission_registration_view = Permission::create(['name' => 'view registrations']);
        $permission_registration_edit = Permission::create(['name' => 'edit registrations']);
        $permission_registration_delete = Permission::create(['name' => 'delete registrations']);

        // Heats
        // Features
        // Points
        // Payouts
        // Assets

        /*
        |--------------------------------------------------------------------------
        | Roles
        |--------------------------------------------------------------------------
        */

        $role_super_admin = Role::create(['name' => 'Super-Admin']);

        $role_promoter = Role::create(['name' => UserRoles::Promoter->value]);
        $role_promoter->givePermissionTo([
            $permission_drivers_create,
            $permission_drivers_view,
            $permission_drivers_edit,
            $permission_drivers_delete,
        ]);
        $role_promoter->givePermissionTo([
            $permission_registration_create,
            $permission_registration_view,
            $permission_registration_edit,
            $permission_registration_delete,
        ]);

        $role_crew = Role::create(['name' => UserRoles::Crew->value]);
        $role_crew->givePermissionTo([
            $permission_drivers_create,
            $permission_drivers_view,
            $permission_drivers_edit,
        ]);
        $role_crew->givePermissionTo([
            $permission_registration_create,
            $permission_registration_view,
        ]);
    }
}
