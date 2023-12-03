<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BatchRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'barang_id' => 'required',
            'kode_batch' => 'required',
            'jumlah_pesanan' => 'required',
            'jumlah_masuk' => 'required',
            'exp_date' => 'required',
            'harga_satuan' => 'required',
            'harga_jual' => 'required',
        ];
    }
}
