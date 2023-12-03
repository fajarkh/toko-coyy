<template>
    <v-menu v-model="showDatePicker" min-width="auto">
        <template v-slot:activator="{ on, attrs }">
            <v-text-field :label="label" :value="content" :placeholder="placeholder" :error-messages="errorMessages" @click:clear="content = ''" v-on="on"
                v-bind="attrs" prepend-inner-icon="mdi-calendar" clearable>
            </v-text-field>
        </template>
        <v-date-picker v-model="content" @change="showDatePicker = false"></v-date-picker>
    </v-menu>
</template>
  
<script>
export default {
    props: {
        value: {
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            default: 'YYYY-MM-DD',
        },
        required: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            showDatePicker: false,
        };
    },
    computed: {
        content: {
            get() { return this.value; },
            set(val) { this.$emit('input', val); },
        },
        //TODO error handling on datepicker
        errorMessages: {
            get() { return this.message; },
            set(val) { this.$emit('input', val); },
        },
    },
};
</script>