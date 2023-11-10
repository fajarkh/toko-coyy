<template>
    <v-row>
        <v-col cols="12">
            <v-text-field label="Nama*" v-model="formData.nama">
            </v-text-field>
        </v-col>
        <v-col cols="12">
            <v-text-field label="Merek*" v-model="formData.merek">
            </v-text-field>
        </v-col>
        <v-col cols="12">
            <v-text-field label="Kategori*" v-model="formData.kategori">
            </v-text-field>
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
            allError: [],
        }
    },
    created() {
        EventBus.$on('sendErrors', (val) => { this.allError = val });
    }
}
</script>