<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Section;

class SectionSeeder extends Seeder
{
    /**
     * Crea secciones predeterminadas en la base de datos.
     */
    public function run(): void
    {
        Section::create([
            'name' => 'Productos',
        ]);

        Section::create([
            'name' => 'Usuarios',
        ]);

        Section::create([
            'name' => 'Perfiles',
        ]);
    }
}
