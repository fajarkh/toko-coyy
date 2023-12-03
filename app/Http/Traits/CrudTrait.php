<?php

namespace App\Http\Traits;

use DB;
use Exception;
// use Helpers\LogHelper;

trait CrudTrait
{
	use CrudHelperTrait;

	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$model = $this->model->with($this->relation)->orderBy('id', 'DESC')->get();

		$view  = [
			'title'			=> $this->title,
			'sub_title'		=> $this->generateSubTitle(__FUNCTION__),
			'items'			=> $model,
			'url'			=> $this->makeDashCase('api/' . strtolower($this->title)),
			'data'			=> method_exists($this, 'formData') ? $this->formData() : null,
			'filter'		=> method_exists($this, 'dataFilter') ? $this->dataFilter() : null,
		];

		return response()->json($view);
	}

	public function store()
	{
		try {
			DB::beginTransaction();

			$data  = $this->getRequest();
			$model = $this->model->fill($data);

			if (method_exists($this, 'customStore')) {
				$custom = $this->customStore($data, $model);
				$data  = isset($custom['data']) ? $custom['data'] : $this->getRequest();
				$model = isset($custom['model']) ? $custom['model']->fill($data) : $this->model->fill($data);
			}

			$model->save();

			DB::commit();
			return response()->json(['message' => 'Data Berhasil Ditambah!!', 'item' => $model], 200);
		} catch (\Throwable $e) {
			DB::rollback();
			throw $e;
		}
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function show($id)
	{
		$model = $this->model->with($this->relation)->findOrFail($id);
		return response()->json($model);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function update($id)
	{
		try {
			DB::beginTransaction();

			$data  = $this->getRequest();
			$model = $this->model->findOrFail($id);
			$model->fill($data);

			if (method_exists($this, 'customUpdate')) {
				$custom = $this->customUpdate($data, $model);
				$data  = isset($custom['data']) ? $custom['data'] : $this->getRequest();
				$model = isset($custom['model']) ? $custom['model']->fill($data) : $this->model->fill($data);
			}

			$model->save();

			DB::commit();
			return response()->json(['message' => 'Data Berhasil Diubah!!', 'item' => $model]);
		} catch (\Throwable $e) {
			DB::rollback();
			throw $e;
		}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id)
	{
		try {
			DB::beginTransaction();

			$model = $this->model->with($this->relation)->findOrFail($id);

			if (method_exists($this, 'customDestroy')) {
				$this->customDestroy($model);
			}

			$model->delete();
			DB::commit();
			return response()->json(['message' => 'Data Berhasil Dihapus!!']);
		} catch (\Throwable $e) {
			DB::rollback();
			throw $e;
		}
	}
}
