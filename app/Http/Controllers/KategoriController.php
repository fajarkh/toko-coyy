<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use Illuminate\Http\Request;

class KategoriController extends Controller
{
    public function index()
    {
        $items = Kategori::all();
        return response()->json($items);
    }

    public function store(Request $request)
    {
        $item = Kategori::create($request->post());
        return response()->json(['message' => 'Data Berhasil Ditambah!!', 'item' => $item]);
    }

    public function show($id)
    {
        $item = Kategori::findOrFail($id);
        return response()->json($item);
    }

    public function update(Request $request, $id)
    {
        $item = Kategori::findOrFail($id);
        $item->fill($request->post())->save();
        return response()->json(['message' => 'Data Berhasil Diubah!!', 'item' => $item]);
    }

    public function destroy($id)
    {
        $item = Kategori::findOrFail($id);
        $item->delete();
        return response()->json(['message' => 'Data Berhasil Dihapus!!']);
    }
}
