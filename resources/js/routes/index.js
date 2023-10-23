import Homepage from '../pages/Homepage.vue'
import About from '../pages/About.vue'
import Contact from '../pages/Contact.vue'
import BarangIndex from '../pages/barang/Index.vue'

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
        // {
        //     path: '/contact',
        //     name: 'contact',
        //     component: Contact,
        // },
        {
            path: '/barang',
            name: 'barang-index',
            component: BarangIndex
        },
    ]
}
