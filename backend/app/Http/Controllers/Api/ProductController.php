<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;

class ProductController extends Controller
{
    /**
     * Lista de productos
     */
    public function index()
    {
        $products = Product::query()
        ->orderBy('code', 'desc')
        ->get();
        
        return response()->json($products);
    }

    /**
     * Guarda un nuevo producto en la base de datos.
     */
    public function store(StoreProductRequest $request)
    {
        $product = Product::create($request->validated());

        return response()->json($product, 201);
    }

    /**
     * Muestra un producto específico por su ID.
     */
    public function show(string $id)
    {
        $product = Product::find($id);
        if ($product === null) {
            return response()->json([
                'message' => 'Producto no encontrado', //Se realiza de esta forma para personalizar mensaje
            ], 404);
        }

        return response()->json($product);
    }

    /**
     * Actualiza un producto existente en la base de datos.
     */
    public function update(UpdateProductRequest  $request, string $id)
    {
        $product = Product::find($id);
        if ($product === null) {
            return response()->json([
                'message' => 'Producto no encontrado.', //Se realiza de esta forma para personalizar mensaje
            ], 404);
        }

        $product->update(
            $request->validated()
        );

        return response()->json($product);
    }

    /**
     * Elimina un producto de la base de datos.
     */
    public function destroy(string $id)
    {
        $product = Product::find($id);
        if ($product === null) {
            return response()->json([
                'message' => 'Producto no encontrado.', //Se realiza de esta forma para personalizar mensaje
            ], 404);
        }

        $product->delete();

        return response()->json([
            'message' => 'Producto eliminado correctamente.',
        ]);
    }
}
