<?php

namespace Database\Seeders;

use App\Models\Barang;
use Illuminate\Database\Seeder;

class BarangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Barang::create(['nama' => 'coba', 'merek' => '1', 'kategori' => 'kategori1', 'satuan' => 'pcs']);
    }
}
