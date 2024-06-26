
<template>
    <div>
        <div class="text-left">
            <v-btn color="primary" @click="tambah">Tambah
                <v-dialog v-model="dialog" activator="parent" width="auto">
                    <v-card>
                        <v-form ref="form">
                            <v-card-title><span class="text-h5">{{ formTitle }}</span></v-card-title>
                            <v-container>
                                <FormLayout :formData="formData" />
                            </v-container>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="dialog = false">Batal</v-btn>
                                <v-btn v-if="formData.id == ''" color="primary" @click.prevent="addItem">Simpan</v-btn>
                                <v-btn v-else color="primary" @click.prevent="updateItem(formData.id)">Ubah</v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card>
                </v-dialog>
            </v-btn>
        </div>

        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Nama Barang</th>
                        <th class="text-left">Kode Batch</th>
                        <th class="text-left">Sisa Stok</th>
                        <th class="text-left">Tanggal Kadaluarsa</th>
                        <th class="text-left">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items">
                        <td>{{ item.nama_barang }}</td>
                        <td>{{ item.kode_batch }}</td>
                        <td>{{ item.sisa_stok }}</td>
                        <td>{{ item.exp_date }}</td>
                        <td>
                            <v-btn @click.prevent="edit(item)">Edit</v-btn>
                            <v-btn color="error" @click.prevent="deleteItem(item.id)">Hapus</v-btn>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>

<script>
const dialog = false;
import FormLayout from './Form.vue'
import { EventBus, formData } from './EventBus.js'

export default {
    name: 'BatchIndex',
    components: {
        FormLayout
    },
    data() {
        return {
            items: [],
            dialog: false,
            formTitle: 'Tambah Data',
            formData: formData,
        }
    },
    mounted() {
        this.getItems();
    },
    methods: {
        resetForm(type) {
            this.formTitle = type ?? 'Tambah';
            Object.keys(this.formData).forEach((key) => {
                this.formData[key] = '';
            });
            EventBus.$emit('sendErrors', []);
        },
        getItems() {
            axios.get('/api/batch').then(res => {
                this.items = res.data.items;
            }).catch((error) => {
                this.errorMessage = error.response.data.message;
            })
        },
        addItem() {
            if (this.$refs.form.validate()) {
                let formData = new FormData();
                let item = this.formData;
                for (var key in item = this.formData) {
                    formData.append(key, item[key]);
                }

                axios.post('/api/batch', formData).then(res => {
                    this.dialog = false; this.resetForm(); this.getItems();
                    this.$swal({
                        text: res.data.message, icon: res.status === 200 ? 'success' : 'warning',
                        timer: 2000, showConfirmButton: false
                    })
                }, (error) => {
                    EventBus.$emit('sendErrors', error.response);
                });
            }
        },
        updateItem(id) {
            let formData = new FormData();
            formData.append('_method', 'PUT');
            let item = this.formData;
            for (var key in item) {
                formData.append(key, item[key] == 'null' ? null : item[key]);
            }

            axios.post(`/api/batch/${id}`, formData).then(res => {
                this.dialog = false;
                this.resetForm(); this.getItems();

                this.$swal({
                    text: res.data.message, icon: res.status === 200 ? 'success' : 'warning',
                    timer: 2000, showConfirmButton: false
                })

            }, (error) => {
                EventBus.$emit('sendErrors', error.response.data.errors);
            });
        },
        deleteItem(id) {
            this.$swal({
                title: 'Kamu Yakin?', text: "Tindakan ini akan menghapus secara permanent!",
                type: 'warning',
                showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33',
                confirmButtonText: 'Iya, Lanjutkan!'
            }).then((result) => {
                if (result.value) {
                    axios.delete(`/api/batch/${id}`).then(res => {
                        this.getItems(); this.$swal({
                            text: res.data.message, icon: res.status === 200 ? 'success' : 'warning',
                            timer: 2000, showConfirmButton: false
                        })
                    }).catch((error) => {
                        this.$swal({ html: error.response.data.message, icon: 'warning' });
                    })
                }
            })
        },
        tambah() {
            this.dialog = true;
            this.resetForm('Tambah');
        },
        edit(item) {
            this.resetForm('Edit'); this.formTitle = 'Edit';
            this.dialog = true;
            for (var key in item) {
                if (typeof this.formData[key] !== 'undefined') {
                    this.formData[key] = item[key];
                }
            }
        },
    }
}
</script>