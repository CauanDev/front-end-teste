import { createRouter, createWebHistory } from 'vue-router';
import RegisterForm from '@/views/RegisterForm.vue';
import LoginForm from '@/views/LoginForm.vue';
import HomeView from '@/views/Home.vue';
import session_routes from './session_routes';
import DashBoard from '@/views/DashBoard.vue';
import UpdateUser from "@/views/UpdateUser.vue"
import ListTemplates from "@/views/ListTemplates.vue"
import CreateResults from "@/views/CreateResults.vue"
import DiagnosticoController from "@/views/DiagnosticoController.vue"
import  NotFoundComponent  from "@/views/NotFoundComponent.vue"
const routes = [

  {
    path: '/register',
    name: 'Register',
    component: RegisterForm,
    meta: {
      auth:true
    }
  
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginForm,
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path:'/dashboard',
    name:'Dashboard',
    component: DashBoard,
    meta: {
      auth:true
    }
  },
  {
    path:'/update',
    name:'Update',
    component: UpdateUser,
    meta: {
      auth:true
    }
  },
  {
    path:'/templates',
    name:'Templates',
    component: ListTemplates,
    meta: {
      auth:true
    }
  },
  {
    path:"/createresults",
    name: "CreateResults",
    component: CreateResults,
    meta: {
      auth:true
    }
  },
  {
    path:"/user/:id",
    name:"DiagnosticoController",
    component: DiagnosticoController,
    
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFoundComponent 
  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(session_routes);
export default router;
