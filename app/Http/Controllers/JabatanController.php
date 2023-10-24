<?php

namespace App\Http\Controllers;

use App\Http\Requests\JabatanRequest;
use App\Models\Jabatan;
use Illuminate\Http\Request;

class JabatanController extends Controller
{
    public function index()
    {
        $items = Jabatan::all();
        return response()->json($items);
    }

    public function store(JabatanRequest $request)
    {
        $item = Jabatan::create($request->post());
        return response()->json(['message' => 'Data Berhasil Ditambah!!', 'item' => $item]);
    }

    public function show($id)
    {
        $item = Jabatan::findOrFail($id);
        return response()->json($item);
    }

    public function update(Request $request, $id)
    {
        $item = Jabatan::findOrFail($id);
        $item->fill($request->post())->save();
        return response()->json(['message' => 'Data Berhasil Diubah!!', 'item' => $item]);
    }

    public function destroy($id)
    {
        $item = Jabatan::findOrFail($id);
        $item->delete();
        return response()->json(['message' => 'Data Berhasil Dihapus!!']);
    }
}
