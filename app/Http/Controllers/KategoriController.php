<?php

namespace App\Http\Controllers;

use App\Http\Requests\KategoriRequest;
use App\Models\Kategori;

class KategoriController extends Controller
{
    public function __construct(Kategori $model)
	{
	    $this->title            = 'Kategori';
	    $this->model            = $model;
	    $this->relation         = [];
	    $this->model_request    = KategoriRequest::class;
	}
}