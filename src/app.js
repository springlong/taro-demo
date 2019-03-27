import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Home from './pages/home'

import './assets/styles/common.scss'

class App extends Component {
  // App配置
  config = {
    pages: [
      'pages/home/index',
      'pages/detail/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  // APP生命周期：程序被载入触发
  // 微信小程序对应周期：onLaunch
  componentWillMount() {
    console.log('App componentWillMount')
  }

  // APP生命周期：程序被载入触发，在 componentWillMount 后执行
  // 微信小程序对应周期：onLaunch
  componentDidMount() {
    console.log('App componentDidMount')
  }

  // APP生命周期：程序可见时触发
  // 微信小程序对应周期：onShow
  componentDidShow() {
    console.log('App componentDidShow')
  }

  // APP生命周期：程序隐藏时触发
  // 微信小程序对应周期：onHide
  componentDidHide() {
    console.log('App componentDidHide')
  }

  // APP生命周期：程序执行错误时触发
  // 微信小程序对应周期：onError
  componentCatchError() {
    console.log('App componentCatchError')
  }

  // APP生命周期：页面不存在时触发
  // 微信小程序对应周期：onPageNotFound
  componentDidNotFound() {
    console.log('App componentDidNotFound')
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider>
        <Home />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
