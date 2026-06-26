<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\Profile;
use App\Models\Section;

class AuthController extends Controller
{
    public function login(Request $request) //Cambiar por Laravel Sanctum para generar token de acceso y no usar api_token, de momento no por tiempo
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $user = User::where(
            'email',
            $credentials['email']
        )->first();

        if (
            $user === null ||
            !Hash::check(
                $credentials['password'],
                $user->password
            )
        ) {
            return response()->json([
                'message' => 'Credenciales incorrectas.'
            ], 401);
        }

        $plainToken = Str::random(80);

        $user->api_token = hash(
            'sha256',
            $plainToken
        );

        $user->save();

        return response()->json([
            'token' => $plainToken,
            'user' => $user,
        ]);
    }

    public function me(Request $request) //Obtener el usuario autenticado y sus perfiles y secciones asociadas, para mostrar en el frontend
    {
        $user = $request->user();

        $profiles = Profile::query()
            ->whereIn('_id', $user->profile_ids)
            ->get();

        $user->makeHidden([
            'profile_ids',
            'api_token',
        ]);

        foreach ($profiles as $profile) {

            $profile->makeHidden([
                'section_ids',
            ]);

            $profile->sections = Section::query()
                ->whereIn('_id', $profile->section_ids)
                ->get([
                    '_id',
                    'name'
                ]);

        }

        $user->profiles = $profiles;

        return response()->json($user);
    }

    public function logout(Request $request)
    {
        $user = $request->user();

        $user->api_token = null;

        $user->save();

        return response()->json([
            'message' => 'Sesión cerrada correctamente.'
        ]);
    }

}