<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Batch extends Model
{
    use HasFactory;
    protected $table = 'batch';
    protected $guarded = ['id'];
    protected $appends = ['nama_barang'];

    public function barang(): BelongsTo
    {
        return $this->belongsTo(Barang::class, 'barang_id');
    }

    public function getNamaBarangAttribute()
    {
        return $this->barang->nama ?? '';
    }
}
