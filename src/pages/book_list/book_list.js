import Taro, { Component } from '@tarojs/taro'
import { View,ScrollView,Input,Image} from '@tarojs/components'
import { AtGrid, AtList, AtListItem } from 'taro-ui'
export default class BookList extends Component {
  config = {
    navigationBarTitleText: '古籍列表'
  }
  constructor() {
    super(...arguments)
    this.state = {
      loading:false,
      books:[]
    }
  }
  componentDidMount () {
    // 获取远程数据
    Taro.showLoading({ title: '加载中' })
    Taro.request({
      url: 'https://www.fatedestiny.fun/?c=fd_gushiwen&m=list_book'
    }).then(res => {
      Taro.hideLoading()
      if (res.data.status == 200) {
        this.setState({
          loading: false,
          books: res.data.data
        })
      }
    })
  }
  handleClick(item){
    Taro.navigateTo({ url: `/pages/book/book?id=${item._id}` })
  }
  render () {
      return this.state.books.length>0 ? (
          <View className='at-article' id='author_list'>
            <View className='at-article__content'>
              <View className='at-article__section'>
                <View className='at-article__p'>
                  <AtList>
                  {
                    this.state.books.map((ele,index)=>{
                        return <AtListItem thumb={ele.image} arrow='right' title={ele.title} onClick={this.handleClick.bind(this,ele)} />
                    })
                  }
                  </AtList>
                </View>
              </View>
            </View>
          </View>
      ) : null
  }
}

