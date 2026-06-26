<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;

class AuthenticateApiToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $header = $request->bearerToken();

        if (!$header) {
            return response()->json([
                'message' => 'No autorizado.'
            ], 401);
        }

        $user = User::where(
            'api_token',
            hash('sha256', $header)
        )->first();

        if (!$user) {
            return response()->json([
                'message' => 'Token inválido.'
            ], 401);
        }

        $request->setUserResolver(fn () => $user);

        return $next($request);
    }
}
