import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import PropTypes from 'prop-types'

import imageLoading from './images/loading.gif'

import './index.scss'

class LoadMore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: false
    }
  }

  static propTypes = {
    show: PropTypes.bool,
    message: PropTypes.string
  }

  static defaultProps = {
    show: false,
    message: '正在加载中'
  }

  componentDidMount() {
    console.log('LoadMore componentDidMount')
  }

  componentWillReceiveProps(nextProps) {
    console.log('LoadMore componentWillReceiveProps this.props', this.props)
    console.log('LoadMore componentWillReceiveProps nextProps', nextProps)

    if (nextProps.show === true && this.state.isShow === false) {
      this.doShow()
    }
  }

  doShow() {
    this.setState({
      isShow: true
    }, () => {
      this.props.onShow && this.props.onShow({message: 'onShow-子组件传递的数据信息'})

      setTimeout(() => {
        console.log('setTimeout')

        this.setState({
          isShow: false
        })
        this.props.onHide && this.props.onHide({message: 'onHide-子组件传递的数据信息'})
      }, 3000)
    })
  }

  render () {
    console.log('LoadMore render')

    const {message} = this.props
    const {isShow} = this.state

    return isShow ? (
      <View className='loadmore-wrap'>
        <Image src={imageLoading} />
        <Text>{message}</Text>
      </View>
    ) : null
  }
}

export default LoadMore