import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button, Navigator } from '@tarojs/components'

import Panel from '../../components/TestDemo/Panel'
import LoadMore from '../../components/TestDemo/LoadMore'
import Info from '../../components/TestDemo/Info'
import Dict from '../../utils/dict'
import Util from '../../utils/util'
import Actions from '../../actions/actions'

import './index.scss'

class Home extends Component {
  constructor(props) {
    super(props);

    // 页面初始数据
    this.state = {
      // 页面数据加载完成
      pageDone: false,
      // 页面数据
      pageData: {},
      // 用户数据
      userInfo: false,
      // 显示更多
      isShowMore: false,
      // 测试数据
      currentPageName: 'home',
      list: [
        {
          title: '三体 （刘慈欣著科幻小说）',
          cont: '《三体》是刘慈欣创作的系列长篇科幻小说，由《三体》、《三体Ⅱ·黑暗森林》、《三体Ⅲ·死神永生》组成，第一部于2006年5月起在《科幻世界》杂志上连载，第二部于2008年5月首次出版，第三部则于2010年11月出版。',
          tip: ''
        },
        {
          title: '星际迷航 （科幻影视系列作品）',
          cont: '《星际迷航》（Star Trek，又译作《星际旅行》等）是由美国派拉蒙影视制作的科幻影视系列，由6部电视剧、1部动画片、13部电影组成。该系列最初由编剧吉恩·罗登贝瑞（Gene Roddenberry）于20世纪60年代提出，经过近50年的不断发展而逐步完善，成为全世界最著名的科幻影视系列之一。',
          tip: ''
        }
      ]
    }
  }

  // 页面配置
  // 只在Page实例中存在的配置数据，对应于原生的page.json文件
  config = {
    navigationBarTitleText: '首页'
  }

  // 页面生命周期：在组件装载发生前被立刻调用
  // 在小程序里对应的生命周期是 onLoad
  // 避免在该方法中引入任何的副作用或订阅。对于这些使用场景，我们推荐使用 constructor()来替代。
  componentWillMount() {
    console.log('home componentWillMount')
  }

  // 页面生命周期：在组件被装载后立即调用
  // 在微信小程序中这一生命周期方法对应 onReady
  // 若你需要从远端加载数据，这是一个适合实现网络请求的地方。在该方法里 setState() 将会触发重新渲染。
  componentDidMount() {
    console.log('home componentDidMount')
    console.log('home this:', this)

    // 识别用户数据
    // const userInfo = this.$root.$parent.globalData.userInfo
    // if (userInfo) {
    //   this.userInfo = userInfo
    // }

    // 加载页面数据
    this.loadPageData()

    // 字典数据的遍历-demo
    Object.values(Dict.TOWARDS).forEach(item => {
      console.log(item)
    })

    // 工具函数-demo
    console.log(Util.showTime())
  }

  // 页面生命周期：在已经装载的组件接收到新属性前调用
  // 若你需要更新状态响应属性改变，你可能需对比 this.props 和 nextProps 并在该方法中使用 this.setState() 处理状态改变。
  componentWillReceiveProps(nextProps) {
    console.log('home componentWillReceiveProps', this.props, nextProps)
  }

  // 页面生命周期：当接收到新的 props 或 state 时，在渲染之前被调用。
  // 用来判断是否需要重新渲染，默认返回true
  shouldComponentUpdate() {
    console.log('home shouldComponentUpdate')
  }

  // 页面生命周期：当接收到新的 props 或 state 时，在渲染之前立即被调用
  // 该生命周期在 shouldComponentUpdate 返回true后被调用
  componentWillUpdate() {
    console.log('home componentWillUpdate')
  }

  // 页面生命周期：在更新发生后立即被调用
  componentDidUpdate() {
    console.log('home componentDidUpdate')
  }

  // 页面生命周期：在一个组件被 卸载(unmounted) 和 销毁(destroyed) 之前立即被调用
  // 在微信小程序中这一生命周期方法对应 onUnload
  componentWillUnmount() {
    console.log('home componentWillUnmount')
  }

  // 页面生命周期：页面可见时时触发
  // 在微信小程序中这一生命周期方法对应 onShow，在 H5 中同样实现
  componentDidShow() {
    console.log('home componentDidShow')
  }

  // 页面生命周期：页面不可见时触发
  // 在微信小程序中这一生命周期方法对应 onHide，在 H5 中同样实现
  componentDidHide() {
    console.log('home componentDidHide')
  }

  // 微信小程序特有的页面事件：下拉刷新
  onPullDownRefresh() {
    console.log('home onPullDownRefresh')
  }

  // 微信小程序特有的页面事件：上拉触底
  onReachBottom() {
    console.log('home onReachBottom')
  }

  // 微信小程序特有的页面事件：点击右上角的转发
  onShareAppMessage() {
    console.log('home onShareAppMessage')
  }

  // 微信小程序特有的页面事件：触发页面滚动
  onPageScroll() {
    console.log('home onPageScroll')
  }

  // 微信小程序特有的页面事件：点击 tab 时触发
  onTabItemTap() {
    console.log('home onTabItemTap')
  }

  // 微信小程序特有的页面事件：预加载
  componentWillPreload() {
    console.log('home componentWillPreload')
  }

  // 获取用户信息回调
  handleGetUserInfo = (evt) => {
    console.log('home handleGetUserInfo:', evt.detail)

    // 保存用户信息
    // 在Page页面实例中，可以通过this.$parent来访问App实例。
    // 在任一组件中，可以通过this.$root.$parent来访问App实例。
    // this.$parent.globalData.userInfo = evt.detail.userInfo

    // 数据更新
    this.setState({
      userInfo: evt.detail.userInfo
    })
  }

  // 跳转至详情页（新开页面）
  handleNavToDetail = (id, currentName) => {
    Taro.navigateTo({ url: `/pages/detail/index?id=${id}&from=${currentName}` })
  }

  // 跳转至详情页（覆盖当前记录）
  handleRedirectToDetail = () => {
    Taro.redirectTo({ url: `/pages/detail/index?id=10099&from=home` })
  }

  // 触发子组件定义的events
  handleTriggerBroadcast = () => {
    // 父组件派发事件给子组件，所有子组件都会收到此广播事件
    // this.$broadcast('onChildEvent', {a: 1, b: 2})
  }

  // 子组件传递事件给父组件（点击加载更多）
  handleLoadMore = () => {
    // 数据更新
    this.setState({
      isShowMore: true
    })
  }

  // 父组件访问子组件的方法
  handleParentToChild = () => {
    // this.$invoke('CompA', 'testMethod', {message: 'data from Index'})
  }

  // 测试组件自定义事件处理函数
  handleEventOnShow = (info, evt) => {
    console.log('home handleEventOnShow:', info, evt)
  }

  // 测试组件自定义事件处理函数
  handleEventOnHide = (info, evt) => {
    console.log('home handleEventOnHide:', info, evt)
  }

  // 用于测试方法执行
  testMethod = (data) => {
    console.log('home testMethod:', data)
  }

  // 显示 loading 提示框
  handleShowLoading = () => {
    Taro.showLoading({
      // 提示的内容
      title: '加载中',
      // 是否显示透明蒙层，防止触摸穿透，默认：false
      mask: true,
    })

    setTimeout(function () {
      // 需主动调用 Taro.hideLoading 才能关闭提示框
      Taro.hideLoading()
    }, 2000)
  }

  // 显示消息提示框
  handleShowToast = () => {
    Taro.showToast({
      // 提示的内容
      title: '成功',
      // iconl类型，默认：success
      icon: 'success',
      // 提示的延迟时间，默认：1500（毫秒）
      duration: 2000,
      // 是否显示透明蒙层，防止触摸穿透，默认：false
      mask: true,
    })
  }

  // 显示模态对话框
  handleShowModal = () => {
    Taro.showModal({
      // 提示的标题
      title: '提示',
      // 提示的内容
      content: '这是一个模态弹窗',
      // 是否显示取消按钮，默认为：true
      showCancel: true,
      // 取消按钮的文字，最多 4 个字符
      cancelText: '取消',
      // 确认按钮的文字，最多 4 个字符
      confirmText: '确认',
      // 接口调用成功的回调函数
      success(res) {
        if (res.confirm) {
          console.log('home handleShowModal: 用户点击确定')
        } else if (res.cancel) {
          console.log('home handleShowModal: 用户点击取消')
        }
      }
    })
  }

  // 显示操作菜单
  handleShowActionSheet = () => {
    const actionList = [
      {name: 'scan', label: '扫一扫'},
      {name: 'shake', label: '摇一摇'},
      {name: 'look', label: '看一看'},
    ]

    Taro.showActionSheet({
      //按钮的文字数组，数组长度最大为6个
      itemList: actionList.map((item) => item.label),
      //按钮的文字颜色
      itemColor: '#000000',
      // 选择操作项时的回调函数
      success(res) {
        // res.tapIndex
        // 用户点击的按钮序号，从上到下的顺序，从0开始
        const selected = actionList[res.tapIndex]
        console.log('home showActionSheet-success', selected)
      },
      // 取消选择时的回调函数(点击取消、蒙层时触发)
      fail(res) {
        console.log('home showActionSheet-fail', res.errMsg)
      }
    });
  }

  // 加载页面数据
  async loadPageData() {
    console.log('home loadPageData')

    // 请求数据
    const res = await Actions.getHomeData({
      city: 'shanghai',
      model: 'more',
    })

    // 接口请求完成
    if (res.data.errorCode === 0) {
      // 更新页面数据
      this.setState({
        pageDone: true,
        pageData: res.data.data || {}
      })
    } else {
      console.log('home loadPageData err:', res)
    }
  }

  // 渲染内容
  render () {
    const {pageDone, pageData, userInfo, currentPageName, list, isShowMore} = this.state

    return (
      <View className='container'>
        {/* 微信用户信息获取 */}
        <View className='module-title'>用户信息</View>
        {
          userInfo ? (
            <View className='userinfo'>
              <Image className='userinfo-avatar' src={userInfo.avatarUrl} />
              <View className='userinfo-nickname'>昵称：{userInfo.nickName}</View>
            </View>
          ) : (
            <View className='row'>
              <Button open-type='getUserInfo' onGetuserinfo={this.handleGetUserInfo}>获取用户信息</Button>
            </View>
          )
        }

        {/* 路由跳转 */}
        <View className='module-title'>路由跳转&事件绑定</View>
        <View className='group-wrap'>
          <View className='row'>
            <Navigator url='/pages/detail/index?id=10088&from=home'>navigate 跳转至详情页</Navigator>
          </View>
          <View className='row'>
            <Navigator url='/pages/detail/index?id=10088&from=home' open-type='redirect'>redirect 跳转至详情页</Navigator>
          </View>
          <View className='row'>
            <Button onClick={this.handleNavToDetail.bind(this, '10099', currentPageName)} data-a='1'>navigate 跳转至详情页</Button>
          </View>
          <View className='row'>
            <Button onClick={this.handleRedirectToDetail}>redirect 跳转至详情页</Button>
          </View>
        </View>

        {/* 同一组件的多次使用 */}
        <View className='module-title'>同一组件的多次使用</View>
        {
          pageDone ? (
            <Panel
              className='panel--special'
              title='关于'
            >
              <View>
                <View>{pageData.name}</View>
                <View>{pageData.desc}</View>
              </View>
            </Panel>
          ): null
        }
        <Panel
          title='介绍'
        >
          <View>
            <View>WePY 框架在开发过程中参考了 Vue 等现有框架的一些语法风格和功能特性，对原生小程序的开发模式进行了再次封装，更贴近于 MVVM 架构模式, 并支持ES6/7的一些新特性。</View>
          </View>
        </Panel>
        <Panel
          title='功能特性'
        >
          <View>
            <View>开发模式转换</View>
            <View>支持组件化开发</View>
            <View>支持加载外部NPM包</View>
            <View>单文件模式，目录结构更清晰，开发更方便</View>
            <View>默认使用babel编译，支持ES6/7的一些新特性</View>
            <View>针对原生API进行优化</View>
          </View>
        </Panel>

        {/* 原生循环方式 */}
        <View className='module-title'>原生循环方式</View>
        {
          list.map(item => {
            return (
              <View className='group-wrap' key={item.title}>
                <View className='group-title'>{item.title}</View>
                <View className='group-content'>{item.cont}</View>
              </View>
            )
          })
        }

        {/* 组件循环方式 */}
        <View className='module-title'>组件循环方式</View>
        {
          list.map(item => {
            return (<Info data={item} key={item.title} showTip />)
          })
        }

        {/* 组件通信 */}
        <View className='module-title'>组件通信</View>
        <View className='group-wrap'>
          <View className='row'>
            <Button onClick={this.handleTriggerBroadcast}>父组件派发事件给子组件</Button>
          </View>
          <View className='row'>
            <Button onClick={this.handleLoadMore}>子组件传递事件给父组件</Button>
            <LoadMore
              message='加载中，请稍等...'
              show={isShowMore}
              onShow={this.handleEventOnShow}
              onHide={this.handleEventOnHide}
            />
          </View>
          <View className='row'>
            <Button onClick={this.handleParentToChild}>父组件访问子组件的方法</Button>
          </View>
        </View>

        {/* 微信API调用 */}
        <View className='module-title'>微信API调用</View>
        <View className='group-wrap'>
          <View className='row'>
            <Button onClick={this.handleShowLoading}>显示loading框</Button>
          </View>
          <View className='row'>
            <Button onClick={this.handleShowToast}>显示消息提示框</Button>
          </View>
          <View className='row'>
            <Button onClick={this.handleShowModal}>显示模态对话框</Button>
          </View>
          <View className='row'>
            <Button onClick={this.handleShowActionSheet}>显示操作菜单</Button>
          </View>
        </View>
      </View>
    )
  }
}

export default Home