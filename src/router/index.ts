import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/store/auth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/orders/:id',
    name: 'view-order',
    component: () => import('../views/OrderView.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/LoginView.vue'),
    meta: {
      requiresAuth: false,
      hideForAuth: true,
    },
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const store = useAuthStore();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.isAuthenticated) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
      return;
    }
  }

  if (to.matched.some((record) => record.meta.hideForAuth)) {
    if (store.isAuthenticated) {
      next({ path: "/" });
      return;
    }
  }
  next();
});

export default router
