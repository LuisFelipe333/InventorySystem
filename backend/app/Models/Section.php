<?php

namespace App\Models;

//Se modifica el modelo Section para que funcione con MongoDB
use MongoDB\Laravel\Eloquent\Model;

class Section extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'sections';

    protected $fillable = [
        'name'
    ];
}
