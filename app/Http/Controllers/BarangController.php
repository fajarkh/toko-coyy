<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use Illuminate\Http\Request;

class BarangController extends Controller
{
    public function index()
    {
        $items = Barang::all();
        return response()->json($items);
    }

    public function store(Request $request)
    {
        $item = Barang::create($request->post());
        return response()->json(['message' => 'item Created Successfully!!', 'item' => $item]);
    }

    public function show($id)
    {
        $item = Barang::findOrFail($id);
        return response()->json($item);
    }

    public function update(Request $request, $id)
    {
        $item = Barang::findOrFail($id);
        $item->fill($request->post())->save();
        return response()->json(['message' => 'Data Updated Successfully!!', 'item' => $item]);
    }

    public function destroy($id)
    {
        $item = Barang::findOrFail($id);
        $item->delete();
        return response()->json(['message' => 'Data Deleted Successfully!!']);
    }
}
