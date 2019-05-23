# Taro小程序开发说明

微信小程序 Taro 框架

官方文档：[https://nervjs.github.io/taro/docs/README.html](https://nervjs.github.io/taro/docs/README.html)

## 导航

- [开发基本规范](#开发基本规范)
  * [目录结构](#目录结构)
  * [文件命名规则](#文件命名规则)
- [脚本书写规范](#脚本书写规范)
  * [组件的自定义事件必须使用 on 前缀](#组件的自定义事件必须使用-on-前缀)
  * [事件处理函数统一使用 handle 前缀](#事件处理函数统一使用-handle-前缀)
  * [动态className命名统一采用classnames第三库进行](#动态className命名统一采用classnames第三库进行)
  * [页面的state声明尽可能添加注释](#页面的state声明尽可能添加注释)
  * [页面的入口文件统一添加@fileoverview注释内容](#页面的入口文件统一添加@fileoverview注释内容)
  * [功能脚本的import名称统一使用首字母大写](#功能脚本的import名称统一使用首字母大写)
  * [import的书写顺序按NPM库、功能脚本、组件、样式依次进行](#import的书写顺序按NPM库、功能脚本、组件、样式依次进行)
- [开发注意事项](#开发注意事项)
  * [微信小程序调试需要关闭的项目设置](#微信小程序调试需要关闭的项目设置)
  * [微信自定义组件的注意事项](#微信自定义组件的注意事项)
  * [向组件传递jsx内容的props命名必须以render开头](#向组件传递jsx内容的props命名必须以render开头)
  * [无法使用无状态组件或者jsx定义函数拆分页面模块](#无法使用无状态组件或者jsx定义函数拆分页面模块)

## 开发基本规范

### 目录结构

```html
├── config                  # 配置目录
|   ├── dev.js              # 开发时配置
|   ├── index.js            # 默认配置
|   └── prod.js             # 打包时配置
|   |-- env.js              # 环境配置
|-- dist
|-- node_modules
|-- src
|   |-- actions                 # 接口目录
|   |   |-- actions.js          # 接口请求的汇总文件
|   |   |-- request.js          # request请求方法的封装处理
|   |   |-- requestIntercept.js # request拦截配置
|   |-- components            # 公共组件目录
|   |   |-- Comp              # 组件按目录分类存放（同一种类的不同组件建议统一归类）
|   |   |   |-- index.js      # 组件的入口文件
|   |   |   |-- index.less    # 组件的样式文件
|   |   |   |-- README.md     # 组件的说明文档
|   |   |-- Form              # 表单类组件（组件归类示例目录）
|   |   |   |-- Field         # 字段输入框（目录）
|   |   |   |-- FieldGroup    # 字段输入框组（目录）
|   |-- images                # 图片目录（图片文件必须按目录分类存放）
|   |   |-- icons             # icon类文件目录
|   |   |-- xxx               # 其它类型文件目录
|   |-- pages                 # 页面目录
|   |   |-- home              # 为每个页面分配一个目录
|   |   |   |-- modules       # 页面下的子组件
|   |   |   |   |-- CompA.js
|   |   |   |-- index.js      # 页面的入口文件
|   |   |   |-- index.less    # 页面的样式文件
|   |-- styles                # 样式目录
|   |   |-- _mixins.less      # 基础的变量、混合声明
|   |   |-- common.less       # 公共样式
|   |   |-- icon.less         # 图标字体
|   |   |-- taro-ui.scss      # 第三方库样式引入
|   |-- utils                 # 工具函数目录
|   |   |-- constant.js       # 常量声明
|   |   |-- util.js           # 工具函数
|   |   |-- dict.js           # 字典数据
|   |   |-- globalData.js     # 全局数据管理
|   |-- app.js                # APP入口文件（等同于原生的app.js、app.json和app.wxss）
|-- package.json              # 项目的package配置
|-- project.config.json       # 小程序项目配置，[参见详情](https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html?search-key=%E9%A1%B9%E7%9B%AE%E9%85%8D%E7%BD%AE)
```

### 文件命名规则

- **图片文件：**

图片文件统一放置在 `images` 目录下，并按文件夹分类存放，文件统一以小写字母命名，多个单词以横杠(-)连接。

例如：`images/icon/icon-error.png`、`images/icon/icon-error-large.png`等。

- **公共样式**

公共样式统一放置在 `styles` 目录下，文件统一以小写字母命名，多个单词以横杠(-)连接。

例如：`styles/common.less`、`styles/icon.less`、`styles/taro-ui.less`等。

- **普通脚本:**

普通脚本统一采用 Camel（驼峰式）的命名方式，文件以 `.js` 作为扩展名。

例如：`util.js`、`globalData.js`等。

- **页面文件：**

页面文件统一放置在 `pages` 目录下，且统一采用 Camel（驼峰式）的命名方式按目录进行管理，入口文件以 `index.js` 进行命名。

例如：`pages/home/index.js`、`pages/detail/index.js`、`pages/searchResult/index.js`等。

- **页面组件：**

页面中的组件抽离统一放置在页面所在目录的 `modules` 目录下，且统一采用 Pascal（首字母大写）的命名方式，文件以 `.js` 作为扩展名。

例如：`pages/detail/modules/Slider.js`、`pages/detail/modules/Map.js`等。

- **公共组件：**

公共组件统一放置在 `components` 目录下，且统一采用 Pascal（首字母大写）的命名方式按目录进行管理，入口文件以 `index.js` 进行命名。

例如：`components/Panel/index.js`、`components/SearchResult/index.js`、`components/LoadingMore/index.js`等。

## 脚本书写规范

### 组件的自定义事件必须使用 on 前缀

准确的来说，父组件要往子组件传递函数，属性名称必须以 `on` 开头，这是由于微信小程序的组件化实现不能直接传递函数给子组件，在taro中是借助小程序组件的[事件机制](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/events.html)来实现这一特性的。

详情请参见 [官方文档](https://nervjs.github.io/taro/docs/best-practice.html#%E7%BB%84%E4%BB%B6%E4%BC%A0%E9%80%92%E5%87%BD%E6%95%B0%E5%B1%9E%E6%80%A7%E5%90%8D%E4%BB%A5-on-%E5%BC%80%E5%A4%B4) 。

```html
<LoadMore
  onComplete={this.handleMoreComplete}
/>
```

### 事件处理函数统一使用 handle 前缀

```js
// 跳转至详情页
handleNavToDetail = (id) => {
  Taro.navigateTo({ url: `/pages/detail/index?id=${id}` })
}
```

### 动态className命名统一采用classnames第三库进行

有关 classnames 第三库的使用，请参见它的 [官方Github](https://github.com/JedWatson/classnames)。

```js
<View
  className={classnames({
    'order-list__item': true,
    'order-list__item--first': index === 0
  })}
/>
```

### 页面的state声明尽可能添加注释

```js
this.state = {
  // 列表数据
  listData: [],
  // 头部筛选定位样式
  listFixedStyle: '',
  // 工单状态
  workOrderStatus: '',
  // 工单记录的数量
  orderCount: '',
}
```

### 页面的入口文件统一添加@fileoverview注释内容

该注释内容主要描述如下信息：

- 该页面是一个什么样的页面
- 该页面的开发者是谁
- 该页面url传参是用来干什么的

```js
/**
 * @fileoverview 工单详情
 * @author 阳团
 *
 * this.$router.params
 * |-- orderId     工单id
 */
```

### 功能脚本的import名称统一使用首字母大写

```js
import Dict from '../../utils/dict'
import Util from '../../utils/util'
import Actions from '../../actions/actions'
```

### import的书写顺序按NPM库、功能脚本、组件、样式依次进行

为了便于import导入语句的阅读，不同种类的导入代码之间空一行，示例如下：

```js
// NPM库
import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'
import classnames from 'classnames'

// 功能脚本
import Actions from '../../../actions/actions'
import Util from "../../../utils/util"
import Dict from '../../../utils/dict'

// 组件
import ListScrollLoad from "../../../components/ListScrollLoad/index"
import ListStatus from "../../../components/ListScrollLoad/ListStatus"
import Field from '../../../components/FormFied/Field'

// 样式
import './index.less'
```

## 开发注意事项

### 微信小程序调试需要关闭的项目设置

- 需要设置关闭 ES6 转 ES5 功能，开启可能报错。
- 需要设置关闭上传代码时样式自动补全，开启可能报错。
- 需要设置关闭代码压缩上传，开启可能报错。

### 微信自定义组件的注意事项

- 微信组件不支持传递函数，只有自定义事件。
- 组件之间传递对象为值的拷贝，而非引用。
- 在Form组件的onSubmit事件中，无法收集自定义组件中使用的表单控件的值，需要通过自定义组件的 `behaviors: ['wx://form-field']` 设置让自定义组件拥有类似表单控件的行为，这样才能被父级的Form识别。

### 向组件传递jsx内容的props命名必须以render开头

在微信小程序中，向组件传递wxml内容是通过 slot 的方式进行的，而 Taro 在实现这一功能时必须给 slot 取名，所以要求必须以 render 开头，这样便于识别 slot 命名。

详情请参见：[官方文档](https://nervjs.github.io/taro/docs/best-practice.html#%E6%94%AF%E6%8C%81-props-%E4%BC%A0%E5%85%A5-js)。

```js
class Dialog extends Component {
  render () {
    return (
      <View className='dialog'>
        <View className='header'>
          {this.props.renderHeader}
        </View>
        <View className='body'>
          {this.props.children}
        </View>
      </View>
    )
  }
}
```

### 无法使用无状态组件或者js定义函数拆分页面模块

我们在进行以 React 开发的项目中，可能会使用 `无状态组件` 或者 `jsx定义函数` 来将页面的结构进行拆分，而不是以组件的形式进行拆分。

但是到了 Taro 这里，由于编译的局限性：

- Taro 不支持 `无状态组件`（[参见说明](https://github.com/NervJS/taro/blob/master/packages/eslint-plugin-taro/docs/no-stateless-function.md)）。
- Taro 不支持在 `render()` 之外的地方定义 jsx 内容（[参见说明](https://github.com/NervJS/taro/blob/master/packages/eslint-plugin-taro/docs/no-jsx-in-class-method.md)）。

所以到了 Taro 这里，我们就只剩下组件的方式来拆分页面模块了。


### 自定义组件遍历jsx打包编译时在抽离函数和对象时有问题

Taro在执行jsx的map遍历时，会将循环体中的函数和对象抽离到遍历item中，在已知的V1.2.14~V1.2.20版本中，如果是在自定义组件中会编译错误，而在页面文件中则编译正常。