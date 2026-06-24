<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Section;

class SectionController extends Controller
{
    /**
     * Muestra una lista de secciones.
     */
    public function index()
    {
        $sections = Section::all();

        return response()->json($sections);
    }
}
