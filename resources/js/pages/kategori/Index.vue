
<template>
    <div>
        <div class="text-left">
            <v-btn color="primary" @click="tambah">Tambah
                <v-dialog v-model="dialog" activator="parent" width="auto">
                    <v-card>
                        <v-form ref="form">
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-alert prominent type="error" v-if="this.errorMessage != ''">
                                        <v-row align="center"><v-col class="grow">{{ this.errorMessage }}</v-col></v-row>
                                    </v-alert>
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
                                </v-container>
                            </v-card-text>
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
    name: 'KategoriIndex',
    components: {
    },
    data() {
        return {
            items: [],
            dialog: false,
            formTitle: 'Tambah Data',
            errorMessage: '',
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
            axios.get('/api/kategori').then(res => {
                this.items = res.data
            }).catch((error) => {
                console.log(error);
                this.errorMessage = error.response.data.message;
            })
        },
        addItem() {
            if (this.$refs.form.validate()) {
                let postData = new FormData();
                postData.append("nama", this.formData.nama);
                postData.append("deskripsi", this.formData.deskripsi);

                axios.post('/api/kategori', postData).then(res => {
                    this.dialog = false;
                    this.resetForm(); this.getItems();
                    this.$swal({
                        text: res.data.message, icon: res.status === 200 ? 'success' : 'warning',
                        timer: 2000, showConfirmButton: false
                    })
                }, (error) => {
                    console.log(error.response.data);
                    this.errorMessage = error.response.data.message;
                });

            }

        },
        updateItem(id) {
            let postData = new FormData();
            postData.append('_method', 'PUT');
            postData.append("nama", this.formData.nama);
            postData.append("deskripsi", this.formData.deskripsi);

            axios.post(`/api/kategori/${id}`, postData).then(res => {
                this.dialog = false;
                this.resetForm(); this.getItems();

                this.$swal({
                    text: res.data.message, icon: res.status === 200 ? 'success' : 'warning',
                    timer: 2000, showConfirmButton: false
                })

            }, (error) => {
                console.log(error.response.data);
                this.errorMessage = error.response.data.message;
            });
        },
        deleteItem(id) {
            this.$swal({
                title: 'Kamu Yakin?',
                text: "Tindakan ini akan menghapus secara permanent!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Iya, Lanjutkan!'
            }).then((result) => {
                if (result.value) {
                    axios.delete(`/api/kategori/${id}`).then(res => {
                        console.log(res);
                        this.getItems();
                        this.$swal({
                            text: res.data.message, icon: res.status === 200 ? 'success' : 'warning',
                            timer: 2000, showConfirmButton: false
                        })
                    }).catch((error) => {
                        console.log(error);
                        this.errorMessage = error.response.data.message;
                    })
                }
            })
        },
        tambah() {
            this.dialog = true;
            this.resetForm();
        },
        edit(item) {
            this.dialog = true;
            this.formTitle = 'Edit';
            this.formData.id = item.id;
            this.formData.nama = item.nama;
            this.formData.deskripsi = item.deskripsi;
        },
        resetForm() {
            this.formTitle = 'Tambah';
            this.formData.id = '';
            this.formData.nama = '';
            this.formData.deskripsi = '';
        },
    }
}
</script>