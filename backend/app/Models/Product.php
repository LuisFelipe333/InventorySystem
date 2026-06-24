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

    protected static function booted(): void
    {
        static::creating(function ($product) {

            $lastProduct = self::orderBy(   //Obtiene el ultimo producto por numero de codigo
                'code_number',              //Apesar de la duplicacion de datos del codigo, se hace para evitar problemas de ordenamiento en el futuro
                'desc'                      
            )->first();

            $nextNumber = 1;

            if ($lastProduct !== null) {
                $nextNumber = $lastProduct->code_number + 1;
            }

            $product->code_number = $nextNumber;

            $product->code = sprintf(
                'P%04d',
                $nextNumber
            );
        });
    }
}
