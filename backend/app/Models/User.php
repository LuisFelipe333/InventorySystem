<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
// use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $connection = 'mongodb';

    protected $collection = 'users';

    protected $fillable = [
        'code',
        'name',
        'email',
        'password',
        'phone',
        'photo',
        'profile_ids',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [ //Se castea profile_ids como un array y se hashea la contraseña
        'code' => 'integer',
        'profile_ids' => 'array', 
        'password' => 'hashed',
    ];

    protected static function booted(): void //Se generara el id de usuario automaticamente 
    {
        static::creating(function ($user) {

            $lastUser = self::orderBy(
                'code',
                'desc'
            )->first();

            $nextCode = 1;

            if ($lastUser !== null) {
                $nextCode = $lastUser->code + 1;
            }

            $user->code = $nextCode;
        });
    }
}
