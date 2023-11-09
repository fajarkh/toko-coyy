<?php

namespace App\Http\Controllers;

use App\Http\Requests\PelangganRequest;
use App\Models\Pelanggan;

class PelangganController extends Controller
{
    public function __construct(Pelanggan $model)
	{
	    $this->title            = 'Pelanggan';
	    $this->model            = $model;
	    $this->relation         = [];
	    $this->model_request    = PelangganRequest::class;
	}

}
