<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProfileRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Models\Profile;

class ProfileController extends Controller
{
    /**
     * Lista de perfiles
     */
    public function index()
    {
        $profiles = Profile::query()
        ->orderBy('code', 'asc')
        ->get();
        
        return response()->json($profiles);
    }

    /**
     * Guarda un nuevo perfil en la base de datos.
     */
    public function store(StoreProfileRequest $request)
    {
        $profile = Profile::create($request->validated());

        return response()->json($profile,201);
    }

    /**
     * Muestra el perfil especificado.
     */
    public function show(string $id)
    {
        $profile = Profile::find($id);
        if ($profile === null) {
            return response()->json([
                'message' => 'Perfil no encontrado', //Se realiza de esta forma para personalizar mensaje
            ], 404);
        }

        return response()->json($profile);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProfileRequest $request, string $id)
    {
        $profile = Profile::find($id);
        if ($profile === null) {
            return response()->json([
                'message' => 'Perfil no encontrado.', //Se realiza de esta forma para personalizar mensaje
            ], 404);
        }

        $profile->update(
            $request->validated()
        );

        return response()->json($profile);
    }

    /**
     * Elimina un perfil de la base de datos.
     */
    public function destroy(string $id)
    {
        $profile = Profile::find($id);
        if ($profile === null) {
            return response()->json([
                'message' => 'Perfil no encontrado.', //Se realiza de esta forma para personalizar mensaje
            ], 404);
        }

        $profile->delete();

        return response()->json([
            'message' => 'Perfil eliminado correctamente.',
        ]);
    }
}
