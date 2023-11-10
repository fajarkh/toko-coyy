<template>
    <v-row>
        <v-col cols="12">
            <v-text-field label="Nama*" v-model="formData.nama" :error-messages="allError.nama">
            </v-text-field>
        </v-col>
        <v-col cols="12">
            <v-text-field label="Affling*" v-model="formData.affling" :error-messages="allError.affling">
            </v-text-field>
        </v-col>
        <v-col cols="12">
            <v-text-field label="No Hp*" v-model="formData.no_hp" :error-messages="allError.no_hp">
            </v-text-field>
        </v-col>
        <v-col cols="12">
            <v-select label="Jenis Kelamin*" v-model="formData.jk" :items="jkItems" item-text="state" item-value="abbr"
                persistent-hint :error-messages="allError.jk" placeholder="Pilih"></v-select>
        </v-col>
        <v-col cols="12">
            <v-select label="Jabatan*" v-model="formData.jabatan_id" :items="jabatanItems" item-text="state"
                item-value="abbr" persistent-hint :error-messages="allError.jabatan_id" placeholder="Pilih"></v-select>
        </v-col>
    </v-row>
</template>

<script>
import { EventBus } from './EventBus.js'
export default {
    name: 'PelangganForm',
    props: ['formData'],
    data() {
        return {
            allError: [],
            jkItems: [
                { state: 'Laki-laki', abbr: 'L' },
                { state: 'Perempuan', abbr: 'P' },
            ],
            jabatanItems: [],
        }
    },
    methods: {
        populateJabatanSelect() {
            axios.get('/api/select-ajax/jabatan').then(res => {
                this.jabatanItems = res.data;
            }).catch((error) => { this.errorMessage = error.response.data.message; });
        },
    },
    mounted() {
        this.populateJabatanSelect();
    },
    created() {
        EventBus.$on('sendErrors', (val) => { this.allError = val });
    }
}
</script>