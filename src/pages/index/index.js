import Taro, { Component } from '@tarojs/taro'
import { View,ScrollView,Input,Image} from '@tarojs/components'
import { AtGrid, AtCard } from 'taro-ui'
import './index.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '古籍'
  }
  constructor() {
    super(...arguments)
    this.state = {
      loading:false,
      item:[]
    }
  }
  navigateTo(url) {
      Taro.navigateTo({ url: url })
  }
  componentDidMount () {
    // 获取远程数据
    Taro.showLoading({ title: '加载中' })
    Taro.request({
      url: 'https://www.fatedestiny.fun/?c=fd_gushiwen&m=index_gushi'
    }).then(res => {
      Taro.hideLoading()
      if (res.data.status == 200) {
        let item = res.data.data
        this.setState({
          loading: false,
          item: item
        })
      }
    }) 
  }
  handleIndexClick(item){
    Taro.navigateTo({ url: `/pages/gushi/gushi?id=${item._id}` })
  }
  render () {
      return this.state.item!=null ? (
          <View className='at-article__content' id="index">
            <View className='at-article__section'>
            {
              this.state.item.map((ele,index)=>{
                  return <AtCard title={ele.title} extra={ele.author} note={ele.dynasty} onClick={this.handleIndexClick.bind(this,ele)}>
                    <View dangerouslySetInnerHTML={{__html: ele.content}}></View>
                  </AtCard>
              })
            } 
            </View>
          </View>
      ) : null
  }
}

