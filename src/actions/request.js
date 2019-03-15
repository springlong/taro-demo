import Taro from '@tarojs/taro'
import requestIntercept from './requestIntercept'

/**
 * 接口地址的基础url前缀
 */
export const apiBaseUrl = 'http://localhost:8001'

/**
 * 统一request的请求封装
 * @param {Object} options 选项配置
 */
export default async function request(options) {
  let params = options.params
  if (requestIntercept.config) {
    params = requestIntercept.config(options.params)
  }

  let res = await Taro.request({
    url: options.url,
    method: options.method || 'GET',
    data: params,
    dataType: options.dataType || 'json',
    header: {
      'Content-Type': options.contentType || 'application/x-www-form-urlencoded'
    }
  })

  if (res.statusCode === 200) {
    res = requestIntercept.success && requestIntercept.success(res)
  } else {
    res = requestIntercept.fail && requestIntercept.fail(res)
  }
  requestIntercept.complete && requestIntercept.complete(res)

  return res
}
