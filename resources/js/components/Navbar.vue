<template>
    <v-navigation-drawer v-model="drawer" app>
        <v-list dense>
            <v-list-item link exact :to="{ name: 'home' }">
                <v-list-item-action><v-icon>mdi-home</v-icon></v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <!-- <v-list-item link exact :to="{ name: 'about' }">
                <v-list-item-action>
                    <v-icon>mdi-information</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>About</v-list-item-title>
                </v-list-item-content>
            </v-list-item> -->
            <!-- <v-list-item link exact :to="{ name: 'contact' }">
                <v-list-item-action>
                    <v-icon>mdi-email</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Contact</v-list-item-title>
                </v-list-item-content>
            </v-list-item> -->
            <v-list-item link exact :to="{ name: 'barang-index' }">
                <v-list-item-action><v-icon>mdi-cube</v-icon></v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Barang</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link exact :to="{ name: 'kategori-index' }">
                <v-list-item-action><v-icon>mdi-cube</v-icon></v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Kategori</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link exact :to="{ name: 'jabatan-index' }">
                <v-list-item-action><v-icon>mdi-cube</v-icon></v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Jabatan</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link exact :to="{ name: 'pelanggan-index' }">
                <v-list-item-action><v-icon>mdi-account-star</v-icon></v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Pelanggan</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    data() {
        return {
            drawer: true
        }
    },
}
</script>
