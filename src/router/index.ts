import { createRouter, createWebHistory } from 'vue-router';
import ProductView from '@/views/ProductView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import { useAuthStore } from '@/stores/auth.store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProductView,
      meta: {
        requiresAuth: true,
      }
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
    // catch all 404
    { 
      path: '/:pathMatch(.*)', 
      name: 'not-found',
      component: NotFoundView,
      meta: {
        requiresAuth: false,
      }
    }
  ],

})

router.beforeEach(async (to, from, next) => { 
  const authStore = useAuthStore(); 
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) { 
    // should redirect to a login, once created
    // for now, just do demo login
    authStore.demoLogin();
    next('/');
  } else { 
    next(); 
  }
});

export default router
