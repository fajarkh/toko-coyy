<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('select-ajax')->group(function () {
    Route::get('jabatan', 'JabatanController@selectAjax');
    Route::get('kategori', 'KategoriController@selectAjax');
});

Route::resource('barang', 'BarangController');
Route::resource('batch', 'BatchController');
Route::resource('kategori', 'KategoriController');
Route::resource('jabatan', 'JabatanController');
Route::resource('pelanggan', 'PelangganController');
