import Homepage from '../pages/Homepage.vue'
import About from '../pages/About.vue'
import Contact from '../pages/Contact.vue'

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
            path: '/contact',
            name: 'contact',
            component: Contact,
        },
        {
            path: '/barang',
            name: 'barang-index',
            component: () => import('../pages/barang/Index.vue' /* webpackChunkName: "resource/js/components/pages/barang/index" */)
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
    ]
}
