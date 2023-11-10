<?php

namespace App\Http\Controllers;

use App\Http\Requests\KategoriRequest;
use App\Models\Kategori;
use ErrorException;
use Illuminate\Validation\ValidationException;

class KategoriController extends Controller
{
	public function __construct(Kategori $model)
	{
		$this->title            = 'Kategori';
		$this->model            = $model;
		$this->relation         = [];
		$this->model_request    = KategoriRequest::class;
	}

	public function selectAjax()
	{
		$model = $this->model->get()->map(function ($model) {
			return ['abbr' => $model->id, 'state' => $model->nama];
		});
		return response()->json($model);
	}

	public function customDestroy($model)
	{
		if ($model->barang->count() > 0) {
			throw new ErrorException("Gagal! <b>$model->nama</b> masih memiliki data barang");
		}
	}
}
