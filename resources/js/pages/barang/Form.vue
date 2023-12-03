<template>
    <v-row>
        <v-col cols="12">
            <v-text-field label="Nama*" v-model="formData.nama" :error-messages="allError.nama">
            </v-text-field>
        </v-col>
        <v-col cols="12">
            <v-text-field label="Merek" v-model="formData.merek" :error-messages="allError.merek">
            </v-text-field>
        </v-col>
        <v-col cols="12">
            <v-select label="Kategori*" v-model="formData.kategori_id" :items="kategoriItems" item-text="state"
                item-value="abbr" persistent-hint :error-messages="allError.kategori_id" placeholder="Pilih"></v-select>
        </v-col>
        <v-col cols="12">
            <v-text-field label="Satuan*" v-model="formData.satuan">
            </v-text-field>
        </v-col>
    </v-row>
</template>

<script>
import { EventBus } from './EventBus.js'
export default {
    name: 'BarangForm',
    props: ['formData'],
    data() {
        return {
            allError: [], kategoriItems: [],
        }
    },
    methods: {
        populateKategoriSelect() {
            axios.get('/api/select-ajax/kategori').then(res => {
                this.kategoriItems = res.data;
            }).catch((error) => { this.errorMessage = error.response.data.message; });
        },
    },
    mounted() {
        this.populateKategoriSelect();
    },
    created() {
        EventBus.$on('sendErrors', (val) => {
            this.allError = val
            console.log(this.allError);
        });
    }
}
</script>