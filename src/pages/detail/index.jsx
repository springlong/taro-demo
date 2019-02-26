import Taro, { Component } from '@tarojs/taro'
import { View, Text, Navigator } from '@tarojs/components'
import Actions from '../../actions/actions'
import './index.scss'

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // 页面数据加载完成
      pageDone: false,
      // 页面数据
      pageData: {},
    }
  }

  config = {
    navigationBarTitleText: '详情展示页'
  }

  componentDidMount() {
    console.log('Detail componentDidMount')

    // 加载页面数据
    this.loadPageData()
  }

  componentWillReceiveProps(nextProps) {
    console.log('Detail componentWillReceiveProps', this.props, nextProps)
  }

  // 加载页面数据
  async loadPageData() {
    console.log('Detail loadPageData')

    // 请求数据
    const res = await Actions.getDetailData({
      id: '1008088'
    })

    // 接口请求完成
    if (res.data.errorCode === 0) {
      // 更新页面数据
      this.setState({
        pageDone: true,
        pageData: res.data.data || {}
      })
    } else {
      console.log('Detail loadPageData err:', res)
    }
  }

  render () {
    const {pageDone, pageData} = this.state

    return (
      <View class="container">
        {
          pageDone ? (
            <View class="page-done">
              <View class="group-wrap">
                <View class="row">{pageData.title}</View>
                <View class="row">{pageData.content}</View>
              </View>
              <View class="group-wrap">
                <View class="row">
                  <Navigator url="/pages/home/index">navigate 返回首页</Navigator>
                </View>
                <View class="row">
                  <Navigator url="/pages/home/index" open-type="redirect">redirect 返回首页</Navigator>
                </View>
                <View class="row">
                  <Navigator url="/pages/home/index" open-type="navigateBack">navigateBack 返回首页</Navigator>
                </View>
              </View>
            </View>
          ) : (
            <View class="page-loading">数据加载中...</View>
          )
        }
      </View>
    )
  }
}

export default Detail