<template>
    <v-row>
        <v-col cols="12">
            <v-text-field label="Nama*" v-model="formData.nama" :error-messages="allError.nama">
            </v-text-field>
        </v-col>
        <v-col cols="12">
            <v-textarea label="Deksripsi" v-model="formData.deskripsi"></v-textarea>
        </v-col>
    </v-row>
</template>

<script>
import { EventBus } from './EventBus.js'
export default {
    name: 'JabatanForm',
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