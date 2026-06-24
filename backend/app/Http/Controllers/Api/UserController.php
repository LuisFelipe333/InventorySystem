<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest; 
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    /**
     * Muestra una lista de usuarios.
     */
    public function index()
    {
         $users = User::query()
            ->orderBy('code', 'asc')
            ->get();

        return response()->json($users);
    }

    /**
     * Guarda un nuevo usuario en la base de datos.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();

        $data['photo'] = $request
            ->file('photo')
            ->store(
                'profile_photos',
                'public'
            );

        $user = User::create($data);

        return response()->json(
            $user,
            201
        );
    }

    /**
     * Muestra un usuario específico por su ID.  
     */
    public function show(string $id)
    {
        $user = User::find($id);

        if ($user === null) {
            return response()->json([
                'message' => 'Usuario no encontrado.',
            ], 404);
        }

        return response()->json($user);

    }

    /**
     * Actualiza un usuario existente en la base de datos.
     */
    public function update(UpdateUserRequest $request, string $id) //Falta resolver eror del PUT
    {
      
        try { //por los diversos errores que pueden surgir al actualizar un usuario por la imagen, se utiliza para manejar errores de manera adecuada. 
            $user = User::find($id);

            if ($user === null) {
                return response()->json([
                    'message' => 'Usuario no encontrado.',
                ], 404);
            }

            $data = $request->validated();

            if ($request->hasFile('photo')){

                if ($user->photo !== null) {
                    Storage::disk('public')
                        ->delete($user->photo);
                }

                $data['photo'] = $request
                    ->file('photo')
                    ->store(
                        'profile_photos',
                        'public'
                    );
            }

            if (empty($data['password'])) {
                unset($data['password']);
            }

            $user->fill($data);

            $dirtyBeforeSave = $user->getDirty();

            $saved = $user->save();

            return response()->json([
                'saved' => $saved,
                'dirty_before_save' => $dirtyBeforeSave, //por si quieres ver los cambios antes de guardar
                'user' => $user->fresh(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
            'message' => $e->getMessage(),
            'file' => $e->getFile(),
            'line' => $e->getLine(),
            ], 500);
        }
        
    }

    /**
     * Elimina un usuario específico de la base de datos.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);

        if ($user === null) {
            return response()->json([
                'message' => 'Usuario no encontrado.',
            ], 404);
        }

        $user->delete();

        return response()->json([
            'message' => 'Usuario eliminado correctamente.',
        ]);
    }
}
