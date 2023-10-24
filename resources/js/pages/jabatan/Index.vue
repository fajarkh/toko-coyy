
<template>
    <div>
        <div class="text-left">
            <v-btn color="primary" @click="tambah">Tambah
                <v-dialog v-model="dialog" activator="parent" width="auto">
                    <v-card>
                        <v-form ref="form">
                            <v-card-title><span class="text-h5">{{ formTitle }}</span></v-card-title>
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field label="Nama*" v-model="formData.nama" :error-messages="allError.nama">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-textarea label="Deksripsi" v-model="formData.deskripsi"></v-textarea>
                                    </v-col>
                                </v-row>
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
                        <th class="text-left">Nama</th>
                        <th class="text-left">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items" :key="item.id">
                        <td>{{ item.nama }}</td>
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

export default {
    name: 'JabatanIndex',
    components: {
    },
    data() {
        return {
            items: [], allError: [],
            dialog: false,
            formTitle: 'Tambah Data',
            formData: {
                id: '',
                nama: '',
                deskripsi: '',
            },
        }
    },
    mounted() {
        this.getItems();
    },
    methods: {
        getItems() {
            axios.get('/api/jabatan').then(res => {
                this.items = res.data
            }).catch((error) => {
                this.errorMessage = error.response.data.message;
            })
        },
        addItem() {
            if (this.$refs.form.validate()) {
                let postData = new FormData();
                postData.append("nama", this.formData.nama);
                postData.append("deskripsi", this.formData.deskripsi);

                axios.post('/api/jabatan', postData).then(res => {
                    this.dialog = false; this.resetForm(); this.getItems();
                    this.$swal({
                        text: res.data.message, icon: res.status === 200 ? 'success' : 'warning',
                        timer: 2000, showConfirmButton: false
                    })
                }, (error) => {
                    this.allError = error.response.data.errors;
                });

            }

        },
        updateItem(id) {
            let postData = new FormData();
            postData.append('_method', 'PUT');
            postData.append("nama", this.formData.nama);
            postData.append("deskripsi", this.formData.deskripsi);

            axios.post(`/api/jabatan/${id}`, postData).then(res => {
                this.dialog = false;
                this.resetForm(); this.getItems();

                this.$swal({
                    text: res.data.message, icon: res.status === 200 ? 'success' : 'warning',
                    timer: 2000, showConfirmButton: false
                })

            }, (error) => {
                this.allError = error.response.data.errors;
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
                    axios.delete(`/api/jabatan/${id}`).then(res => {
                        this.getItems(); this.$swal({
                            text: res.data.message, icon: res.status === 200 ? 'success' : 'warning',
                            timer: 2000, showConfirmButton: false
                        })
                    }).catch((error) => {
                        this.allError = error.response.data.errors;
                    })
                }
            })
        },
        tambah() {
            this.dialog = true;
            this.resetForm('Tambah');
        },
        edit(item) {
            this.resetForm('Edit');
            this.dialog = true;
            this.formTitle = 'Edit';
            this.formData.id = item.id;
            this.formData.nama = item.nama;
            this.formData.deskripsi = item.deskripsi;
        },
        resetForm(type) {
            this.formTitle = type ?? 'Tambah';
            Object.keys(this.formData).forEach((key) => {
                this.formData[key] = '';
            });
            this.allError = [];
        },
    }
}
</script>