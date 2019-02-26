import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import PropTypes from 'prop-types'
import './index.scss'

class Info extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  static propTypes = {
    data: PropTypes.object,
    showTip: PropTypes.bool,
  }

  static defaultProps = {
    data: {},
    showTip: false,
  }

  componentDidMount() {
    console.log('Info componentDidMount')
  }

  componentWillReceiveProps(nextProps) {
    console.log('Info componentWillReceiveProps', this.props, nextProps)
  }

  render () {
    const {data, showTip} = this.state

    return (
      <View className='info-wrap'>
        <View className='info-title'>
          {data.title}
        </View>
        <View className='info-content'>
          {data.cont}
        </View>
        {
          showTip ? (
            <View className='info-tip'>
              {data.tip || 'tip content'}
            </View>
          ) : null
        }
      </View>
    )
  }
}

export default Info