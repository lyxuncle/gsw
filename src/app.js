import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import AuthorList from './pages/author_list/author_list'
import './app.scss'
/*
Todo
-- 1. 作者列表
-- 2. 首页内容
-- 3. 古籍列表
-- 4. 我的标签
*/ 

if (process.env.TARO_ENV === 'weapp') {
  require('taro-ui/dist/weapp/css/index.css')
} else if (process.env.TARO_ENV === 'h5') {
  require('taro-ui/dist/h5/css/index.css')
}

class App extends Component {
  config = {
    pages: [
      //作者
      'pages/index/index',
      'pages/author_list/author_list',
      'pages/author/author'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#0068C4',
      navigationBarTitleText: '古代诗文大全',
      navigationBarTextStyle: 'white',
      enablePullDownRefresh: true
    },
    tabBar: {
      color: "#626567",
      selectedColor: "#2A8CE5",
      backgroundColor: "#FBFBFB",
      borderStyle: "white",
      list: [{
        pagePath: "pages/index/index",
        text: "index",
        iconPath: "./asset/images/discovery.png",
        selectedIconPath: "./asset/images/discovery_focus.png"
      },{
        pagePath: "pages/author_list/author_list",
        text: "author",
        iconPath: "./asset/images/discovery.png",
        selectedIconPath: "./asset/images/discovery_focus.png"
      }]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  render () {
    return (
      <AuthorList />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
