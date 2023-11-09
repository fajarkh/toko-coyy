<?php

namespace App\Http\Controllers;

use App\Http\Requests\PelangganRequest;
use App\Models\Pelanggan;

class PelangganController extends Controller
{
    public function index()
    {
        $items = Pelanggan::all();
        return response()->json($items);
    }

    public function store(PelangganRequest $request)
    {
        $item = Pelanggan::create($request->post());
        return response()->json(['message' => 'Data Berhasil Ditambah!!', 'item' => $item]);
    }

    public function show($id)
    {
        $item = Pelanggan::findOrFail($id);
        return response()->json($item);
    }

    public function update(PelangganRequest $request, $id)
    {
        $item = Pelanggan::findOrFail($id);
        $item->fill($request->post())->save();
        return response()->json(['message' => 'Data Berhasil Diubah!!', 'item' => $item]);
    }

    public function destroy($id)
    {
        $item = Pelanggan::findOrFail($id);
        $item->delete();
        return response()->json(['message' => 'Data Berhasil Dihapus!!']);
    }
}
