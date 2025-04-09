<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class RegistrationPolicy
{
    use HandlesAuthorization;

    public function index(User $user): bool
    {
        return $user->can('view registrations');
    }

    public function store(User $user): bool
    {
        return $user->can('create registrations');
    }

    public function storeNewDriver(User $user): bool
    {
        return $user->can('create drivers');
    }

    public function update(User $user): bool
    {
        return $user->can('edit registrations');
    }

    public function destroy(User $user): bool
    {
        return $user->can('delete registrations');
    }

}
