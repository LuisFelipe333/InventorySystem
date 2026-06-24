<?php

namespace App\Models;

//Se modifica el modelo Profile para que funcione con MongoDB
use MongoDB\Laravel\Eloquent\Model;

class Profile extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'profiles';

    protected $fillable = [
        'code',
        'name',
        'section_ids',
    ];

    protected $casts = [
        'section_ids' => 'array', //Se castea section_ids como un array para que se pueda almacenar correctamente en MongoDB
    ];

    protected static function booted(): void //Se generara el id de perfil automaticamente
    {
        static::creating(function ($profile) {

            $lastProfile = self::orderBy(
                'code',
                'desc'
            )->first();

            $nextCode = 1;

            if ($lastProfile !== null) {
                $nextCode = $lastProfile->code + 1;
            }

            $profile->code = $nextCode;
        });
    }


}
