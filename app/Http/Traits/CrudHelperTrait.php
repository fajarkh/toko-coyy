<?php 

namespace App\Http\Traits;

use Intervention\Image\Facades\Image;
use File;

trait CrudHelperTrait {

	// Generate things
	public function generateSubTitle($type)
	{
		$sub_title = null;

		switch ($type) {
			case 'index':
					$sub_title = 'Data '.$this->title;
			break;

			case 'create':
					$sub_title = 'Tambah '.$this->title;
			break;

			case 'edit':
					$sub_title = 'Edit '.$this->title;
			break;

			case 'show':
					$sub_title = 'Lihat '.$this->title;
			break;
		}

		return $sub_title;
	}

	public function generateViewName($type)
	{
		$view_name = $this->generateFolderName().'.'.$type;

		return $view_name;
	}

	public function generateFolderName()
	{
		$current_title = strtolower($this->title);
		
		return str_replace(' ', '_', $current_title);
	}

	public function generateUrl($type)
	{
		$url = $this->makeDashCase('api/'.strtolower($this->title)).'/'.$type;

		return $url;
	}

	public function makeDashCase($title)
	{
		$dash_case = str_replace(' ', '-', $title);

		return $dash_case;
	}
	// 

	// role
	public function checkRoleExists()
	{
		$new_role = '';

		$auth_role = strtolower(str_replace(' ', '-', auth()->user()->roles->first()->name));

		if (in_array($auth_role, $this->role)) {
			$new_role = $auth_role;
		}

		return $new_role;
	}
	// 

	// Redirect things
	public function redirectSuccess($type)
	{
		$message = null;
		switch ($type) {
			case 'store':
					$message = 'Berhasil Menambah Data';
				break;
			case 'update':
					$message = 'Berhasil Merubah Data';
				break;
			case 'destroy':
					$message = 'Berhasil Menghapus Data';
				break;
		}

		return redirect()->route($this->generateUrl('index'))
						 ->withMessage($message);
	}

	public function redirectBackWithError($message)
	{
		return redirect()->back()->withInput()->withErrors($message);
	}

	public function redirectWithSessionFlash($message)
	{
		return redirect()->route($this->generateUrl('index'))
						 ->with($message);
	}
	// 

	// others
	public function completeUrl()
	{
		return [
    			'index'		=> $this->generateUrl('index'),
    			'destroy'	=> $this->generateUrl('destroy'),
    			'create'	=> $this->generateUrl('create'),
    			'edit'		=> $this->generateUrl('edit'),
    			'show'		=> $this->generateUrl('show'),
    	];
	}

	public function getRequest()
	{
		if (method_exists($this, 'customRequest')) {
			$request 	   = $this->customRequest(app($this->model_request));
		}else {
			$model_request = app($this->model_request);
			$request 	   = $model_request->all();
		}

		return $request;
	}

	public function validationRelation($model)
    {
    	$response = [];

		foreach($this->relation as $relasi) {

			$check = $this->checkArray($model->$relasi->toArray());

			if ($check) {

				$response = [
					'icon'			=> 'error',
					'message'		=> 'Data '.class_basename($model).' digunakan di '.$this->camelCaseToSpace($relasi),
				];
	
			}

		}

		return $response;
    }

    public function camelCaseToSpace($relasi) 
    {
    	$kata 	= preg_replace('/(?<=\\w)(?=[A-Z])/'," $1", $relasi); 
    	
    	$string = trim($kata);

    	return ucwords($string);
    }

    public function checkArray($model)
    {
    	$result = null;

    	if (count($model) == count($model, COUNT_RECURSIVE)) {

    		$result = false;
    	
    	}else {

    		$result = true;
    	
    	}

    	return $result;
    }

    public function saveFoto($request, $lokasi, $request_name)
    {
        $data = [];
        if(!empty($request->has($request_name))) {

            $file       = $request->file($request_name);

            if (!File::isDirectory(storage_path().'/app/public/'.$lokasi)) {
                File::makeDirectory(storage_path().'/app/public/'.$lokasi);
            }

            if(substr($file->getMimeType(), 0, 5) == 'image') {
	            if (!empty($file)) {
	                $extension  = $file->getClientOriginalExtension();
	                $filename   = md5($file->getFilename()).'.'.$extension;

	                $location   = storage_path().'/app/public/'.$lokasi.'/'.$filename;
	                Image::make($file)->save($location);

	                $data[$request_name] = $filename;
	            }
            }else {
            	if (!empty($file)) {
	            	$extension  = $file->getClientOriginalExtension();
	            	$filename   = md5($file->getFilename()).'.'.$extension;

	            	$file->storeAs('public/'.$lokasi, $filename);

	            	$data[$request_name] = $filename;
	            }
            }

        }

        return $data[$request_name];
    }

    public function saveFotoCustom($request, $lokasi, $request_name, $data_file)
    {
        $data = [];
        if(!empty($request->has($request_name))) {

            $file       = $data_file;

            if (!File::isDirectory(storage_path().'/app/public/'.$lokasi)) {
                File::makeDirectory(storage_path().'/app/public/'.$lokasi);
            }

            if(substr($file->getMimeType(), 0, 5) == 'image') {
	            if (!empty($file)) {
	                $extension  = $file->getClientOriginalExtension();
	                $filename   = md5($file->getFilename()).'.'.$extension;

	                $location   = storage_path().'/app/public/'.$lokasi.'/'.$filename;
	                Image::make($file)->save($location);

	                $data[$request_name] = $filename;
	            }
            }else {
            	if (!empty($file)) {
	            	$extension  = $file->getClientOriginalExtension();
	            	$filename   = md5($file->getFilename()).'.'.$extension;

	            	$file->storeAs('public/'.$lokasi, $filename);

	            	$data[$request_name] = $filename;
	            }
            }

        }

        return $data[$request_name];
    }

    public function delImage($filename, $lokasi)
    {
        $path = storage_path().'/app/public/'.$lokasi.'/';
        return File::delete($path.$filename);
    }

    public function getMenuName()
    {
    	$class_name 		= get_class($this->model);
    	$explode_class 		= explode('\\', $class_name);
    	
    	if (is_array($explode_class)) {
    		return end($explode_class);
    	}

    	return '';
    }

    public function checklistNo ($input, $pad_len = 7, $prefix = null) {
        if ($pad_len <= strlen($input))
            trigger_error('<strong>$pad_len</strong> cannot be less than or equal to the length of <strong>$input</strong> to generate invoice number', E_USER_ERROR);

        if (is_string($prefix))
            return sprintf("%s%s", $prefix, str_pad($input, $pad_len, "0", STR_PAD_LEFT));

        return str_pad($input, $pad_len, "0", STR_PAD_LEFT);
    }
	//
}