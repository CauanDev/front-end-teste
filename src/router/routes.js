import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '@/views/LoginForm.vue';
import session_routes from './session_routes';
import ListUser from "@/views/ListUser.vue"
import ListOwners from "@/views/ListOwners.vue"
import ListVehicles from "@/views/ListVehicles.vue"
import ListServices from "@/views/ListServices.vue"
import ListWorkers from "@/views/ListWorkers.vue"
import NotFoundComponent  from "@/views/NotFoundComponent.vue"
import DashBoard from "@/views/DashBoard.vue"
const routes = [

  {
    path: '/users',
    name: 'Users',
    component: ListUser,
    meta: {
      auth:true
    }
  
  },
  {
    path: '/dashboard',
    name:'DashBoard',
    component: DashBoard,
    meta: {
      auth:true
    }
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
    meta: {
      auth:true
    }
  },
  {
    path:'/vehicles',
    name:'Vehicles',
    component: ListVehicles,
    meta: {
      auth:true
    }

  },
  {
    path:'/services',
    name:'Services',
    component: ListServices,
    meta: {
      auth:true
    }
  },
  {
    path:'/workers',
    name:'Workers',
    component: ListWorkers,
    meta: {
      auth:true
    }
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
