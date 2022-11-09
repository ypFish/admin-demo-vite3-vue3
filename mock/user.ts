import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/user',
    method: 'get',
    response: ({ body }) => {
      // console.log('body>>>>>>>>', JSON.stringify(body))
      return {
        code: 0,
        message: 'ok',
        data: {
          time: 3,
          user: {
            name: 'yp',
            age: 18,
          },
        },
      }
    },
  },
] as MockMethod[]
