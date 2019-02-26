const mockRouter = {
  // 首页接口
  '/get/home/data': (params) => {
    return {
      errorCode: 0,
      message: '',
      data: {
        name: 'Taro',
        desc: '使用 Taro，我们可以只书写一套代码，再通过 Taro 的编译工具，将源代码分别编译出可以在不同端（微信/百度/支付宝/字节跳动小程序、H5、React-Native 等）运行的代码。'
      }
    }
  },

  // 详情页接口
  '/get/detail/data': (params) => {
    return {
      errorCode: 0,
      message: '',
      data: {
        title: `详情展示页 ${params.id}`,
        content: 'Taro 是一套遵循 React 语法规范的 多端开发 解决方案。现如今市面上端的形态多种多样，Web、React-Native、微信小程序等各种端大行其道，当业务要求同时在不同的端都要求有所表现的时候，针对不同的端去编写多套代码的成本显然非常高，这时候只编写一套代码就能够适配到多端的能力就显得极为需要。'
      }
    }
  }
}

module.exports = mockRouter
