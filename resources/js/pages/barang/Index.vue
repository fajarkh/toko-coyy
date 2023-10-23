<template>
    <v-simple-table>
        <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-left">Nama</th>
                    <th class="text-left">Merek</th>
                    <th class="text-left">Kategori</th>
                    <th class="text-left">Satuan</th>
                    <th class="text-left">Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.nama">
                    <td>{{ item.nama }}</td>
                    <td>{{ item.merek }}</td>
                    <td>{{ item.kategori }}</td>
                    <td>{{ item.satuan }}</td>
                    <td>
                        <v-btn @click.prevent="editUser(item)">
                            Edit
                        </v-btn>
                        <v-btn color="error" @click.prevent="deleteUser(item.id)">
                            Hapus
                        </v-btn>
                    </td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>

<script>

export default {
    name: 'BarangIndex',
    components: {
    },
    data() {
        return {
            items: []
        }
    },
    mounted() {
        this.getItems();
    },
    methods: {
        getItems() {
            axios.get('/api/barang').then(res => {
                console.log(res);
                this.items = res.data
            }).catch((error) => {
                console.log(error);
                this.errorMessage = error.response.data.message;
            })
        },
    }
}
</script>

