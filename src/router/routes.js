
const routes = [
 
  {
    path: '/',
    component: () => import('pages/index.vue'),
    name: 'index' 
  },
  {
    path: '/project',
    component: () => import('pages/project.vue'),
    name: 'project' 
  },
  {
    path: '/monitor',
    component: () => import('pages/monitor.vue'),
    name: 'monitor' 
  },
  {
    path: '/report',
    component: () => import('pages/report.vue'),
    name: 'report' 
  },
  
  {
    path: '/settime',
    component: () => import('pages/settime.vue'),
    name: 'settime' 
  },
  {
    path: '/app/:project?',
    component: () => import('pages/loading.vue'),
    name: 'app' 
  },
  


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
