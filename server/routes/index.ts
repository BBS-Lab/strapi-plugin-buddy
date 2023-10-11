export default {
  'admin': {
    type: 'admin',
    routes: [
      {
        method: 'GET',
        path: '/',
        handler: 'myController.index',
        config: {
          policies: ['admin::isAuthenticatedAdmin'],
        },
      },
      {
        method: 'POST',
        path: '/progress',
        handler: 'myController.progress',
        config: {
          policies: ['admin::isAuthenticatedAdmin'],
        },
      },
      {
        method: 'POST',
        path: '/deploy',
        handler: 'myController.deploy',
        config: {
          policies: ['admin::isAuthenticatedAdmin'],
        },
      }
    ]
  },
}
