<template>
    <v-row>
        <v-col cols="6">
            <v-select label="Barang*" v-model="formData.barang_id" :items="barangItems" item-text="state" item-value="abbr"
                persistent-hint :error-messages="allError.barang_id" placeholder="Pilih"></v-select>
        </v-col>
        <v-col cols="6">
            <v-text-field label="Kode Batch*" v-model="formData.kode_batch" :error-messages="allError.kode_batch">
            </v-text-field>
        </v-col>
        <v-col cols="6">
            <v-text-field label="Jumlah Pesanan*" v-model="formData.jumlah_pesanan"
                :error-messages="allError.jumlah_pesanan" type="number">
            </v-text-field>
        </v-col>
        <v-col cols="6">
            <v-text-field label="Jumlah Masuk*" v-model="formData.jumlah_masuk" :error-messages="allError.jumlah_masuk"
                type="number">
            </v-text-field>
        </v-col>
        <v-col cols="6">
            <v-text-field label="Harga Satuan*" v-model="formData.harga_satuan" :error-messages="allError.harga_satuan"
                type="number">
            </v-text-field>
        </v-col>
        <v-col cols="6">
            <v-text-field label="Harga Jual*" v-model="formData.harga_jual" :error-messages="allError.harga_jual"
                type="number">
            </v-text-field>
        </v-col>
        <v-col cols="12">
            <base-date-picker label="Tanggal Kadaluarsa*" v-model="formData.exp_date" error-messages="allError.exp_date" />
        </v-col>
    </v-row>
</template>

<script>
import { EventBus } from './EventBus.js'
export default {
    name: 'BatchForm',
    props: ['formData'],
    data() {
        return {
            allError: [],
            barangItems: [],
        }
    },
    methods: {
        populateBarangSelect() {
            axios.get('/api/select-ajax/barang').then(res => {
                this.barangItems = res.data;
            }).catch((error) => { this.errorMessage = error.response.data.message; });
        },
    },
    mounted() {
        this.populateBarangSelect();
    },
    created() {
        EventBus.$on('sendErrors', (error) => {
            if (error.status === 422) {
                this.allError = error.data.errors;
            } else {
                if (error.length) {
                    this.$swal({ text: error.data.message, icon: 'warning' });
                }
            }
        });
    }
}
</script>