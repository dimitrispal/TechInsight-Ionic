import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';


import IAuthState from '@/models/IAuth';
import { apiInit } from '@/services/api';
import { store } from '@/store';
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import TicketList from '../views/TicketList.vue'
import Project from '../views/Project.vue'
import TicketDetail from '../views/TicketDetail.vue'
import Folder from '../views/Folder.vue';

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '',
  //   redirect: '/folder/Inbox'
  // },
  // {
  //   path: '/folder/:id',
  //   component: Folder
    
  // },









  // {
  //   path: '/',
  //   redirect: '/auth/login'
  // },
  // {
  //   path: '/auth/login',
  //   name: 'Login',
  //   component: Login
  // },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: Home,
  //   meta: { requiredAuth: true },
  // },


  // {
  //   path: '/',
  //   redirect: '/project'
  // },

  // {
  //   path: '/project',
  //   name: 'Project',
  //   component: Project
  //   // meta: { requiredAuth: true },
  // },

  {
      path: '/',
      redirect: '/tickets'
    },
  

  {
    path: '/tickets',
    name: 'Ticket',
    component: TicketList,
    // meta: { requiredAuth: true },
  },
  // {
  //   path: '/project/ticketDetail',
  //   name: 'TicketDetail',
  //   component: TicketDetail,
  //   meta: { requiredAuth: true },
  // }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

function guard(to: any, from: any, next: any, authData: IAuthState) {
  if (to.meta && to.meta.requiredAuth) {
    if (authData && authData.token) {
      return next();
    }
    return next({ path: "/auth/login" });
  } else {
    if (authData && authData.token) {
      apiInit({ token: authData.token  })
      return next({ path: "/project/tickets" });
    }
    return next();
  }
}

router.beforeEach((to, from, next) => {

  const authData = store.state.auth
  return guard(to, from, next, authData);
});


export default router