const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Home.vue'), name: 'Home' },
      {
        path: '/about',
        component: () => import('src/pages/About.vue'),
        name: 'About'
      },
      {
        path: '/login',
        component: () => import('src/pages/Login.vue'),
        name: 'Login'
      },
      {
        path: '/tree',
        component: () => import('src/pages/TreeOfFiles.vue'),
        name: 'Tree'
      },
      {
        path: '/WeatherApp',
        component: () => import('src/pages/WeatherApp.vue'),
        name: 'WeatherApp'
      },
      {
        path: '/WeatherAppPrecise',
        component: () => import('src/pages/WeatherAppPrecise.vue'),
        name: 'WeatherAppPrecise'
      },
      {
        path: '/user/:otherUserId',
        component: () => import('src/pages/UserCaterwauls.vue'),
        name: 'User'
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
