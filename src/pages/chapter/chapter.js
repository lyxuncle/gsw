import Taro, { Component } from '@tarojs/taro'
import { View,ScrollView,Input,Image} from '@tarojs/components' 
import { AtCard, AtButton, AtFloatLayout, AtNavBar } from 'taro-ui'
export default class Chapter extends Component {
  config = {
    navigationBarTitleText: '古籍详情'
  }
  constructor() {
    super(...arguments)
    this.state = {
      loading:false,
      item:null,
      isOpened:false,
      gid:null
    }
  }
  componentWillMount () {
    this.setState({
      gid: this.$router.params.id
    })
  }
  componentDidMount () {
    // 获取远程数据
    Taro.showLoading({ title: '加载中' })
    Taro.request({
      url: 'https://www.fatedestiny.fun/?c=fd_gushiwen&m=single_guwen_chapter&id='+this.state.gid
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
  handleClick = () => {
    this.setState({
      isOpened: true
    })
  }
  handleBack = () => {
    Taro.navigateBack()
  }
  getChapter = () => {
    // return <View className='at-article'>{(this.state.item.sub_category ? (this.state.item.sub_category + '·') : null)} {this.state.item.title} <AtButton circle type='secondary' size='small' onClick={this.handleClick.bind(this)}>译注</AtButton></View>
  }
  render () {
      return this.state.item!=null ? (
          <View className='at-article'>
            <AtNavBar leftIconType='chevron-left' onClickLeftIcon={this.handleBack} color='#000' title='详情' />
            <View className='at-article__content'>
            <View className='at-article__section'>
            <View className='at-article__p'>
              <AtCard extra={this.state.item.main_category} title={this.state.item.title}>
                <View dangerouslySetInnerHTML={{__html: this.state.item.content}}></View>
              </AtCard>
            </View>
            </View>
            </View>

            <AtFloatLayout isOpened={this.state.isOpened} title='译文' >
              <View className='at-article__h3' dangerouslySetInnerHTML={{__html: this.state.item.fanyi}}></View>
            </AtFloatLayout>
          </View>
      ) : null
  }
}

