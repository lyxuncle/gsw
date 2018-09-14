import Taro, { Component } from '@tarojs/taro'
import { View,ScrollView,Input,Image} from '@tarojs/components'
import { AtGrid, AtCard, AtNavBar } from 'taro-ui'
export default class Book extends Component {
  config = {
    navigationBarTitleText: '古籍'
  }
  constructor() {
    super(...arguments)
    this.state = {
      loading:false,
      item:null,
      bid:null
    }
  }
  componentWillMount () {
    this.setState({
      bid: this.$router.params.id
    })
  }
  navigateTo(url) {
      Taro.navigateTo({ url: url })
  }
  componentDidMount () {
    // 获取远程数据
    Taro.showLoading({ title: '加载中' })
    Taro.request({
      url: 'https://www.fatedestiny.fun/?c=fd_gushiwen&m=single_guwen&id='+this.state.bid
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
  getGridData(){
    let _chapters = this.state.item.chapters.map((ele,index)=>{
        return {
            value:ele.title,
            link:ele.link,
            cid:ele._id
        }
    })
    return _chapters;
  }
  handleClick(item,index){
    console.log(item,index)
    Taro.navigateTo({ url: `/pages/chapter/chapter?id=${item.cid}`})
  }
  handleBack = () => {
    Taro.navigateBack()
  }
  render () {
      return this.state.item!=null ? (
          <View className='at-article'>
            <AtNavBar leftIconType='chevron-left' onClickLeftIcon={this.handleBack} color='#000' title={this.state.item.title} />
            <View className='at-article__h2'>
              <AtCard title={this.state.item.title} thumb={this.state.item.image}>
                {this.state.item.desc}
              </AtCard>
            </View>

            <View className='at-article__content'>
              <View className='at-article__section'>
                <View className='at-article__p'>
                  <AtGrid mode='rect' columnNum='3' data={this.getGridData()} onClick={this.handleClick}/>
                </View>
              </View>
            </View>
          </View>
      ) : null
  }
}

