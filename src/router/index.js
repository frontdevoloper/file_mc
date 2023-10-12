import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue')
    },
    {
      path: '/userBoard',
      name: 'userBoard',
      component: () => import('../views/user/ReportView.vue')
    },
    {
      path: '/register',
      name: 'registrtion',
      component: () => import('../views/auth/RegistrationView.vue')
    },
    {
      path: '/admin',
      name: 'adminPanel',
      component: () => import('../views/user/AdminBoard.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
