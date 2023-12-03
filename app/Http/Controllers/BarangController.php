<?php

namespace App\Http\Controllers;

use App\Http\Requests\BarangRequest;
use App\Models\Barang;

class BarangController extends Controller
{
    public function __construct(Barang $model)
	{
	    $this->title            = 'Barang';
	    $this->model            = $model;
	    $this->relation         = [];
	    $this->model_request    = BarangRequest::class;
	}

	public function selectAjax()
	{
		$model = $this->model->get()->map(function ($model) {
			return ['abbr' => $model->id, 'state' => $model->nama];
		});
		return response()->json($model);
	}
}
