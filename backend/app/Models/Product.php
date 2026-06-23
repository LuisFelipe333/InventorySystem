<?php

namespace App\Models;

//Se modifica el modelo Product para que funcione con MongoDB
use MongoDB\Laravel\Eloquent\Model;

class Product extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'products';

    protected $fillable = [
        'code',
        'name',
        'brand',
        'price',
    ];

    protected $casts = [
        'price' => 'float',
    ];
}
