// request请求拦截配置
const requestIntercept = {
  // 发出请求时的回调函数
  config (params) {
    // 对所有request请求中的参数对象统一附加时间戳属性
    params.timestamp = +new Date()

    // 必须返回参数对象，否则无法发送请求到服务端
    return params
  },

  // 请求成功后的回调函数
  success (res) {
    // 可以在这里对收到的响应数据对象进行加工处理
    console.log('requestIntercept success: ', res)

    // 必须返回响应数据对象，否则后续无法对响应数据进行处理
    return res
  },

  // 请求失败后的回调函数
  fail (res) {
    console.log('requestIntercept fail: ', res)

    // 必须返回响应数据对象，否则后续无法对响应数据进行处理
    return res
  },

  // 请求完成时的回调函数(请求成功或失败都会被执行)
  complete (res) {
    console.log('requestIntercept complete: ', res)
  }
}

export default requestIntercept
