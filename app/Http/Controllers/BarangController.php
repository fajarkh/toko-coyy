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
}
