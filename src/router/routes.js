function load(component) {
  return () => import(`../pages/${component}.vue`)
}

function loadChild(component, patch = '') {
  return () => import(`../components/${patch}${component}.vue`)
}

const routes = [
  {
    path: '/',
    component: load('login-register'),
    meta: {title: '起始'},
    children: [
      {
        path: '',
        name: 'login',
        component: loadChild('login', 'login-register/'),
        meta: {title: '登录'}
      },
      {
        path: 'register',
        name: 'register',
        component: loadChild('register', 'login-register/'),
        meta: {title: '注册'}
      },
    ],
  },
  {
    path: '/mainPages',
    component: load('main-pages'),
    meta: {title: '主页'},
    children: [
      {
        path: 'myNews',
        name: 'myNews',
        component: loadChild('my-news', 'main-pages/'),
        meta: {title: '我的消息'}
      },
      {
        path: 'addressBook',
        name: 'addressBook',
        component: loadChild('address-book', 'main-pages/'),
        meta: {title: '通讯录'}
      },
      {
        path: 'commonFunctions',
        name: 'commonFunctions',
        component: loadChild('common-functions', 'main-pages/'),
        meta: {title: '常用功能'}
      },
      {
        path: 'myInformation',
        name: 'myInformation',
        component: loadChild('my-information', 'main-pages/'),
        meta: {title: '我的信息'}
      }
    ],
  },
  {
    path: '/singleChat',
    component: load('single-chat'),
    meta: {title: '聊天'},
  }
];
export default routes
