<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class DriverPolicy
{
    use HandlesAuthorization;

    public function store(User $user): bool
    {
        return $user->can('create drivers');
    }

    public function index(User $user): bool
    {
        return $user->can('view drivers');
    }

    public function show(User $user): bool
    {
        return $user->can('view drivers');
    }

    public function update(User $user): bool
    {
        return $user->can('update drivers');
    }

    public function destroy(User $user): bool
    {
        return $user->can('delete drivers');
    }
}
