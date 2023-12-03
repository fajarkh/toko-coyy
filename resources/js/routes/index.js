import Homepage from '../pages/Homepage.vue'
import About from '../pages/About.vue'

export default {
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Homepage,
        },
        {
            path: '/about',
            name: 'about',
            component: About,
        },
        {
            path: '/transaksi',
            name: 'transaksi-index',
            component: () => import('../pages/transaksi/Index.vue' /* webpackChunkName: "resource/js/components/pages/transaksi/index" */)
        },
        {
            path: '/barang',
            name: 'barang-index',
            component: () => import('../pages/barang/Index.vue' /* webpackChunkName: "resource/js/components/pages/barang/index" */)
        },
        {
            path: '/batch',
            name: 'batch-index',
            component: () => import('../pages/batch/Index.vue' /* webpackChunkName: "resource/js/components/pages/batch/index" */)
        },
        {
            path: '/kategori',
            name: 'kategori-index',
            component: () => import('../pages/kategori/Index.vue' /* webpackChunkName: "resource/js/components/pages/kategori/index" */)
        },
        {
            path: '/jabatan',
            name: 'jabatan-index',
            component: () => import('../pages/jabatan/Index.vue' /* webpackChunkName: "resource/js/components/pages/jabatan/index" */)
        },
        {
            path: '/pelanggan',
            name: 'pelanggan-index',
            component: () => import('../pages/pelanggan/Index.vue' /* webpackChunkName: "resource/js/components/pages/pelanggan/index" */)
        },
    ]
}
