import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import Cart from '@/pages/Cart';
import Details from '@/pages/Details';

// Admin
import Index from '@/pages/admin/Index';
import Products from '@/pages/admin/Products';
import Edit from '@/pages/admin/Edit';
import New from '@/pages/admin/New';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/admin',
            component: Index,
            children: [
                {
                    path: 'new',
                    name: 'New',
                    component: New
                }, 
                {
                    path: '',
                    name: 'Products',
                    component: Products
                },
                {
                    path: 'edit/:id',
                    name: 'Edit',
                    component: Edit
                },
            ]
        },
        {
            path: '/cart',
            name: 'Cart',
            component: Cart
        },
        {
            path: '/details/:id',
            name: 'Details',
            component: Details
        }
    ]
});