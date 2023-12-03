import Vue from 'vue'
export const EventBus = new Vue();
export let formData = {
    id: '',
    barang_id: null,
    kode_batch: null,
    jumlah_pesanan: 0,
    jumlah_masuk: 0,
    exp_date: '',
    harga_satuan: null,
    harga_jual: null,
};