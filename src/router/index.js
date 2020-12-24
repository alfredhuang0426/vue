import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '@/components/pages/Index'
import Introduction from '@/components/pages/Introduction'
import Menu from '@/components/pages/Menu'
import Login from '@/components/pages/Login'
import Dashboard from '@/components/pages/Dashboard'
import DashboardProducts from '@/components/pages/DashboardProducts'
import DashboardOrders from '@/components/pages/DashboardOrders'
import Cart from '@/components/pages/Cart'
import CustomerCheckout from '@/components/pages/CustomerCheckout'

Vue.use(VueRouter)

export default new VueRouter({
    routes:[
        {
            path:'*',
            redirect:'/',
        },
        {
            name:'index',
            path:'/',
            component:Index,
            children:[
                {
                    name:'Introduction',
                    path:'',
                    component:Introduction,
                },
                {
                    name:'Menu',
                    path:'Menu',
                    component:Menu,
                },
                {
                    name:'cart',
                    path:'cart',
                    component:Cart,
                },
                {
                    name:'customer_checkout',
                    path:'customerCheckout/:orderId',
                    component:CustomerCheckout,
                }
            ]
        },    
        {
            name:'login',
            path:'/login',
            component:Login,
        },
        {
            name:'dashboard',
            path:'/dashboard',
            component:Dashboard,
            meta: { requiresAuth: true },
            children:[
                {
                    name:'products',
                    path:'products',
                    component:DashboardProducts,
                    meta: { requiresAuth: true },
                },
                {
                    name:'orders',
                    path:'orders',
                    component:DashboardOrders,
                    meta: { requiresAuth: true },
                }
            ]
        },
        
    ]
});