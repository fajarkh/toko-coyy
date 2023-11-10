<template>
    <v-row>
        <v-col cols="12">
            <v-text-field label="Nama*" v-model="formData.nama">
            </v-text-field>
        </v-col>
        <v-col cols="12">
            <v-text-field label="Deskripsi" v-model="formData.deskripsi">
            </v-text-field>
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
        EventBus.$on('sendErrors', (error) => {
            if (error.status === 422) {
                this.allError = error.data.errors;
            } else {
                this.$swal({ text: error.data.message, icon: 'warning' });
            }
        });
    }
}
</script>