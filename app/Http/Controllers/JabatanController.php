<?php

namespace App\Http\Controllers;

use App\Http\Requests\JabatanRequest;
use App\Models\Jabatan;

class JabatanController extends Controller
{
	public function __construct(Jabatan $model)
	{
		$this->title            = 'Jabatan';
		$this->model            = $model;
		$this->relation         = [];
		$this->model_request    = JabatanRequest::class;
	}

	public function selectAjax()
	{
		$model = $this->model->get()->map(function ($model) {
			return ['abbr' => $model->id, 'state' => $model->nama];
		});
		return response()->json($model);
	}
}
