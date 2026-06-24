<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    /**
     * Determina si el usuario está autorizado para realizar esta solicitud.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Obtiene las reglas de validación que se aplican a la solicitud.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',

            'email' => [
                'required',
                'email',
                'unique:users,email',
            ],

            'phone' => [
                'nullable',
                'regex:/^\+[1-9]\d{7,14}$/',
            ],

            'photo' => [
                'required', 
                'image',
            ],

            'password' => [
                'required',
                'string',
                'min:8',
            ],

            'profile_ids' => 'required|array|min:1',

            'profile_ids.*' => 'string',
        ];
    }
}
