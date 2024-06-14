import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '@/views/LoginForm.vue';
import session_routes from './session_routes';
import ListUser from "@/views/ListUser.vue"
import ListOwners from "@/views/ListOwners.vue"
import ListVehicles from "@/views/ListVehicles.vue"
import ListServices from "@/views/ListServices.vue"
import  NotFoundComponent  from "@/views/NotFoundComponent.vue"
const routes = [

  {
    path: '/users',
    name: 'Users',
    component: ListUser
  
  },
  {
    path: '/',
    name: 'Home',
    component: LoginForm,
  },
  {
    path:'/owners',
    name:'Owners',
    component: ListOwners,
  },
  {
    path:'/vehicles',
    name:'Vehicles',
    component: ListVehicles,

  },
  {
    path:'/services',
    name:'Services',
    component: ListServices
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFoundComponent 
  }
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(session_routes);
export default router;
