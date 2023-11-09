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
    </v-row>
</template>

<script>
import { EventBus } from './eventBus.js'
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
        }
    },
    created() {
        EventBus.$on('sendErrors', (val) => { this.allError = val });
    }
}
</script>