<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBarangTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('barang', function (Blueprint $table) {
            $table->id();
            $table->string('sku')->nullable();
            $table->string('nama')->nullable();
            $table->string('merek')->nullable();
            $table->unsignedBigInteger("kategori_id")->nullable();
            $table->foreign("kategori_id")->references("id")->on("kategori")->onUpdate('cascade')->onDelete('cascade');
            $table->string('satuan')->nullable();
            $table->string('deskripsi')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('barang');
    }
}
