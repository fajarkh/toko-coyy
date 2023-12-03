<?php

namespace App\Http\Controllers;

use App\Http\Requests\BatchRequest;
use App\Models\Batch;

class BatchController extends Controller
{
	public function __construct(Batch $model)
	{
		$this->title            = 'Batch';
		$this->model            = $model;
		$this->relation         = [];
		$this->model_request    = BatchRequest::class;
	}

	public function customStore($data, $model)
	{
		$data['sisa_stok'] = $data['jumlah_masuk'];
		return ['data' => $data];
	}

	public function customUpdate($data, $model)
	{
		$data['sisa_stok'] = $data['jumlah_masuk'];
		return ['data' => $data];
	}
}
