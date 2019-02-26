import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import PropTypes from 'prop-types'
import './index.scss'

class Panel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: true
    }
  }

  static options = {
    // 支持全局样式类
    addGlobalClass: true
  }

  static propTypes = {
    title: PropTypes.any,
  }

  static defaultProps = {
    title: 'Title'
  }

  componentDidMount() {
    console.log('Panel componentDidMount')
  }

  componentWillReceiveProps(nextProps) {
    console.log('Panel componentWillReceiveProps', this.props, nextProps)
  }

  // 变更视图
  handleChangeView = () => {
    this.setState({
      isShow: !this.state.isShow
    })
  }

  render () {
    const {isShow} = this.state
    const showName = isShow ? '收起' : '展开'
    const stateName = isShow ? 'isShow' : 'isHide'

    return (
      <View className={`panel ${this.props.className || ''}`}>
        <View className='panel-title'>
          <View className='panel-title-value'>
            {this.props.title}
          </View>
          <View className='panel-title-extra'>
            <Text onClick={this.handleChangeView}>{showName}</Text>
          </View>
        </View>
        <View className={`panel-content ${stateName}`}>
          {this.props.children}
        </View>
      </View>
    )
  }
}

export default Panel