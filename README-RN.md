# 小程序开发说明

微信小程序 Taro 框架

官方文档：[https://nervjs.github.io/taro/docs/README.html](https://nervjs.github.io/taro/docs/README.html)

## 导航

- [开发基本规范](#开发基本规范)
  * [目录结构](#目录结构)
  * [文件命名规则](#文件命名规则)
- [样式布局规范](#样式布局规范)
  * [React Native 样式布局](#React-Native-样式布局)
  * [React Native 不被支持的 CSS 属性](#React-Native-不被支持的-CSS-属性)
  * [React Native 差异化 CSS 表现](#React-Native-差异化-CSS-表现)
  * [跨端样式的兼容处理](#跨端样式的兼容处理)
  * [其它注意事项](#其它注意事项)
    * [多行文本省略号的实现](#多行文本省略号的实现)
    * [不支持 Web CSS 方式的 iconfont](#不支持-Web-CSS-方式的-iconfont)
- [脚本书写规范](#脚本书写规范)
  * [组件的自定义事件必须使用 on 前缀](#组件的自定义事件必须使用-on-前缀)
  * [事件处理函数统一使用 handle 前缀](#事件处理函数统一使用-handle-前缀)
  * [动态className命名统一采用classnames第三库进行](#动态className命名统一采用classnames第三库进行)
  * [页面的state声明尽可能添加注释](#页面的state声明尽可能添加注释)
  * [页面的入口文件统一添加@fileoverview注释内容](#页面的入口文件统一添加@fileoverview注释内容)
  * [功能脚本的import名称统一使用首字母大写](#功能脚本的import名称统一使用首字母大写)
  * [import的书写顺序按NPM库、功能脚本、组件、图片、样式依次进行](#import的书写顺序按NPM库、功能脚本、组件、图片、样式依次进行)
  * [错误提示使用规则](#错误提示使用规则)
- [开发注意事项](#开发注意事项)
  * [微信小程序调试需要关闭的项目设置](#微信小程序调试需要关闭的项目设置)
  * [微信自定义组件的注意事项](#微信自定义组件的注意事项)
  * [向组件传递jsx内容的props命名必须以render开头](#向组件传递jsx内容的props命名必须以render开头)
  * [无法使用无状态组件或者jsx定义函数拆分页面模块](#无法使用无状态组件或者jsx定义函数拆分页面模块)
- [多端兼容](#多端兼容)
  * [滚动条行为必须使用ScrollView组件实现](#滚动条行为必须使用ScrollView组件实现)
  * [路由跳转一律使用导航API，不推荐使用Navigator组件](#路由跳转一律使用导航API，不推荐使用Navigator组件)
  * [不支持使用Sync同步的方式操作Storage](#不支持使用Sync同步的方式操作Storage)


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

## 样式布局规范

由于项目可能需要兼容 `微信小程序` 、`H5`、 `React Native`，样式上 H5 最为灵活，小程序次之，React Native最弱，多端统一的样式管理就是要对齐短板，也就是要以 React Native 的约束来管理样式，同时兼顾小程序的限制，所以我们约定如下规则：

1. 页面布局必须采用 Flex 布局。
2. 样式选择器仅支持类选择器，不支持标签选择器、后代选择器、伪元素等特性。
3. 为了更好的规避样式冲突，本项目一律采用 BEM 规范进行样式的书写。
4. 由于不能使用后代选择器，所以覆盖组件样式统一采用 style 属性覆盖。

### React Native 样式布局

React Native 中的布局样式，是通过 style 属性进行内联设置，Taro 在编译过程中会将 css 书写的样式通过 className 对应从而转换成内联方式。因此在使用 Taro 兼容 React Native 开发的样式布局过程中仅支持类选择器，不支持标签选择器、后代选择器、伪元素等特性。

React Native 支持的样式并不与 CSS 完全一致，因此在布局之前，最好阅读 Taro 提供的 [React Native 开发注意事项](https://nervjs.github.io/taro/docs/before-dev-remind.html#react-native)。

另外 React Native 中的文字必须包裹在 Text 组件里面，否则不显示。而且font、text、color等字体、文本、颜色属性不能加在 View 组件上，只能加在 Text 组件上。同时padding、border、margin等盒模型属性只能加在 View 组件上，而不能应用于 Text 组件。

因此在实际布局时，建议针对文本内容进行View+Text的层级嵌套书写：

``` html
<View className='form-link'>
  <Text className='form-link__text'>文本内容</Text>
</View>
```

为了更好的了解什么属性能用，什么不能用，你也可以查看 React Native 支持的 CSS 的基本情况：
- [布局属性](https://reactnative.cn/docs/layout-props/)
- [View样式属性](https://reactnative.cn/docs/view-style-props/#props)
- [Text样式属性](https://reactnative.cn/docs/text-style-props/#docsNav)

### React Native 不被支持的 CSS 属性

- `order`
- `box-sizing`
- `box-shadow`
- `white-space`
- `word-break`
- `word-wrap`
- `text-overflow`
- `border-top`
- `border-right`
- `border-bottom`
- `border-left`
- `background-image`
- `pointer-events`

### React Native 差异化 CSS 表现

- **`position`**

仅支持 `position: absolute`、`position: relative`。

- **`display`**

仅支持 `display: flex`、`display: none`。

- **`padding`**

RN中的 padding 属性仅支持1个值，用来同时设置四个方向的padding，而不支持分别给四个方位设置不同的padding。Taro在编译处理时会针对padding的组合书写进行拆分处理，因此可以正常书写 `padding: top right bottom left;`。

- **`border`**

RN中的 border-style 不能应用于单个边框，因此在书写样式时不支持使用 `border-left`、`border-right` 等属性。

可以正常使用 `border-width`、`border-color`、`border-left-width`、`border-left-color` 等属性，且 `border-style` 仅支持 `solid, dotted, dashed` 。

如果想要常规的设置 `border-top: 1px solid #ddd`，需要拆分书写：

``` css
.selector {
  border-width: 0;
  border-top-width: 1px;
  border-style: solid;
  border-color: #ddd;
}
```

- **`border-radius`**

RN中的 border-radius 仅支持数字值，因此 CSS 中常见使用的百分比不能使用。

- **`transform`**

RN中的 transform 相关设置不支持百分比，如果书写了百分比的属性值，将导致页面styles编译为空。。

- **`margin`**

RN中的 margin 属性仅支持1个值，用来同时设置四个方向的margin，而不支持分别给四个方位设置不同的margin。Taro在编译处理时会针对margin的组合书写进行拆分处理，因此可以正常书写 `margin: top right bottom left;`。

- **`background`**

RN中的背景设置仅支持 `background-color` 一个属性，不支持 `background: url()` 等其它方式。在 Taro 中书写 CSS `background: #fff;`，最终编译会被转换为 `background-color: #fff;` ，但是在JS代码中书写的则不会被转换。因此统一禁止 `background` 属性的使用，一律通过 `background-color` 属性进行背景颜色的设置。

- **`flex-direction`**

RN中的 `flex-direction` 属性默认值是 column，而CSS的默认值是 row。因此在书写样式代码时，为了保证多端统一，必须指定 `flex-direction` 的值。

- **`box-sizing`**

RN不支持 `box-sizing` 属性，但是 View 标签的盒模型默认的是 `boder-box`，与 Web、小程序的表现有所区别。

为了保证多端统一，我们需要针对Web、小程序端将 View 组件的 `box-sizing` 属性全局设置为 `boder-box`。

- **`overflow`**

RN中，区块内容超出容器将会自动隐藏，而Web和小程序则不会，所以针对固定尺寸的容器，始终建议显示设置overflow属性。

- **`word-break`**

RN中不支持该属性，但是长串字母或数字在容器中将会自动换行，而Web和小程序则不会，因此需要针对Web和小程序设置该属性来处理长串字母或数字不换行的怪异行为。

### 跨端样式的兼容处理

通常情况下，我们按照RN的规则来书写样式，但是在多端样式的呈现方面依然会存在兼容问题，我们不得不针对 H5 和小程序书写与 RN 不一致的样式代码。但是 Taro 对于 RN 不支持的CSS属性在编译构建时会报错，Taro 提供了注释方案来解决这一问题，如下代码所示，在构建为 RN 输出时，位于 `/*postcss-pxtransform rn eject enable*/` 和 `/*postcss-pxtransform rn eject disable*/`之间的样式代码不会被处理：

```css
.text {
  /*postcss-pxtransform rn eject enable*/
  white-space: nowrap;
  /*postcss-pxtransform rn eject disable*/
}
```

由于项目中不止一处会需要这样处理，注释代码一多就显得不那么好看，因此我们在 `/src/assets/styles/_mixins.less` 文件中定义 `eject` 混合函数来实现单行兼容样式的书写：

```css
@import "../../assets/styles/_mixins.less";

.text {
  .eject(white-space, nowrap);
}
```

### 其它注意事项

#### 多行文本省略号的实现

RN中通过 Text 组件的 [numberOfLines](https://reactnative.cn/docs/text/#numberoflines) 属性来实现，而 H5 和小程序则使用 `-webkit-line-clamp` 实现，在 `_mixins.less` 中定义了 `.line-clamp(@line)` 混合方便书写。

```html
<Text numberOfLines={2}>多行文本省略号</Text>
```

```css
@import "../../assets/styles/_mixins.less";

.text {
  .line-clamp(2);
}
```

#### 不支持 Web CSS 方式的 iconfont

APP有一套自己的方式去使用iconfont，这与Web端、小程序端有所差异，为了多端统一，我们暂时不得不放弃使用iconfont，而改用 `Image` 图片引入。待有比较好的兼容方案再做优化调整。

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

- 该页面时一个什么样的页面
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

### import的书写顺序按NPM库、功能脚本、组件、图片、样式依次进行

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

// 图片
import imageIconUrl './images/icon.png'

// 样式
import './index.less'
```

### 错误提示使用规则

表单校验的错误提示，采用顶部通知的形式，我们统一使用 Taro UI 的 [AtMessage 组件](https://taro-ui.aotu.io/#/docs/message)来进行实现。配合WeValidator使用的话详见如下代码所示：

```js
/**
 * WeValidator全局配置
 */
import WeValidator from 'we-validator'
import weValidatorRule from './utils/weValidatorRule'

// 表单验证-全局配置
WeValidator.onMessage = function (data) {
  Taro.atMessage({
    type: 'error',
    message: data.msg,
    duration: 2000,
  })
}

// 表单验证-自定义校验规则
weValidatorRule(WeValidator)
```

```js
/**
 * AtMessage组件的页面配置
 */

// 导入 AtMessage 组件
import { AtMessage } from 'taro-ui'

// render函数
render() {
  return (
    <View>
      {/* 在render中引入 AtMessage 组件 */}
      <AtMessage />
    </View>
  )
}
```

而其它提示，我们统一封装在 `utils/tips.js` 文件里头，使用详情如下：

```js
// 导入 Tips 封装工具
import Tips from '../../utils/tips'

// 一般提示
Tips.info('一般提示')

// 一般提示&隐藏时回调函数
Tips.info('一般提示', () => {
  console.log('隐藏提示框')
})

// 成功提示（接口请求成功）
Tips.success('成功提示')

// 成功提示&隐藏时回调函数
Tips.success('成功提示', () => {
  console.log('隐藏提示框')
})

// 失败提示（接口请求失败）
Tips.fail('失败提示')

// 失败提示&隐藏时回调函数
Tips.fail('失败提示', () => {
  console.log('隐藏提示框')
})

// 如果上面三种场景模式不能满足需求，就用Tips.toast()来完成
Tips.toast({
  // 提示内容
  message: '提示内容',
  // 持续时间
  duration: 3000,
  // icon类型（同wx.toast)
  icon: 'success',
  // 自定义图标的本地路径（同wx.toast)
  image: undefined,
  // 提示框隐藏时执行的回调函数
  onHide: () => {
    console.log('隐藏提示框')
  }
})

// 提示框不自动隐藏
Tips.toast({
  // 提示内容
  message: '提示内容',
  // 持续时间，设置为0表示不自动隐藏
  duration: 0,
  // 提示框隐藏时执行的回调函数
  onHide: () => {
    console.log('隐藏提示框')
  }
})

// 手动关闭提示框
Tips.clear()

// 加载提示
Tips.loading()
Tips.loading('加载中')

// 加载完成，隐藏加载提示
Tips.loaded()
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


## 多端兼容

### 滚动条行为必须使用ScrollView组件实现

由于React Native的视图行为与H5、小程序不一致，当内容超出屏幕后并不会出现滚动条，也无法滑动，必须配合ScrollView组件来实现。

因此对于每个页面来说，都必须嵌套一层ScrollView实现滚动行为。

由于我们需要做多端兼容，单纯的给ScrollView设置高度100%肯定不行，因为可滚动区域的高度受状态栏、tab栏等因素的影响而表现有所不同，因此我们统一使用 `Util.getWindowHeight()` 来获取窗口除了状态栏、tab栏以外的可用高度。

```js
<ScrollView
  scrollY
  style={{ height: Util.getWindowHeight() }}
>
  ...
</ScrollView>
```

### 路由跳转一律使用导航API，不推荐使用Navigator组件

由于 `<Navigator />` 组件在 `H5` 和 `React Native` 中不被支持。

为了实现多端兼容，项目中的路由跳转均采用 [导航API](https://nervjs.github.io/taro/docs/native-api.html#%E5%AF%BC%E8%88%AA) 。

### 不支持使用Sync同步的方式操作Storage

React Native 不支持 `Taro.getStorageSync` 等同步方式操作Storage的API，所以针对Storage的操作方式一律使用异步方式:

详情请查阅 [官方文档](https://nervjs.github.io/taro/docs/native-api.html#taroclearstoragesync)！

```js
Taro.getStorage({key: 'key'}).then(res => {
  console.log(res.data)
})
```