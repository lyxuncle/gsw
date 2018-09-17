import Taro, { Component } from '@tarojs/taro'
import { View,ScrollView,Input,Image} from '@tarojs/components'
import { AtAvatar, AtCard, AtList, AtListItem, AtPagination, AtNavBar } from 'taro-ui'
import WxParse from '../../wxParse/wxParse'

import './author.scss'

export default class Author extends Component {
  config = {
    navigationBarTitleText: '作者'
  }
  constructor() {
    super(...arguments)
    this.state = {
      loading:true,
      item:null,
      fanyi_id:[],
      shangxi_id:[],
      aid:null,
      list:[],
      page:{
        pageSize:10,
        current:1,
        total:0
      }
    }
  }
  componentWillMount () {
    this.setState({
      aid: this.$router.params.id
    })
  }
  navigateTo(url) {
      Taro.navigateTo({ url: url })
  }
  componentDidMount () {
    // 获取远程数据
    Taro.showLoading({ title: '加载中' })

    Taro.request({
      url: 'https://www.fatedestiny.fun/?c=fd_gushiwen&m=single_author&id='+this.state.aid
    }).then(res => {
      Taro.hideLoading()
      if (res.data.status == 200) {
        // const item = res.data.data
        this.setState({
          item: res.data.data,
          // fanyi_id:item.fanyi_id ? item.fanyi_id : [],
          // shangxi_id:item.shangxi_id ? item.shangxi_id : [],
          loading: false,
        })
      }
    })

    // Taro.request({
    //   url: 'https://www.fatedestiny.fun/?c=fd_gushiwen&m=list_author_gushiwen&id='+this.state.aid
    // }).then(res => {
    //   if (res.data.status == 200) {
    //     this.setState({
    //       list: res.data.data,
    //       page:{
    //         ...this.state.page,
    //         total:res.data.data.length
    //       }
    //     })
    //   }
    // })
  }
  onPageChange({type,current}) {
    this.setState({
      page:{
        ...this.state.page,
        current:current,
      }
    })
  }
  handleBack = () => {
    Taro.navigateBack()
  }
  render () {
    const { item = {fanyi_id: []}, list = [] } = this.state
    const {
      fanyi_id,
      title,
      _id,
      image,
      desc
    } = item
      || {
        fanyi_id: [],
        title: '',
        id: '0',
        image: '',
        desc: ''
      }

    const content = fanyi_id.map((item,index) => {
        return (
          <AtCard title={this.state.item['fanyi_title_'+item]} key={index}>
            <View className='at-article__p'  dangerouslySetInnerHTML={{__html: this.state.item['fanyi_'+item]}} />
          </AtCard>
        )
      })

    const listCont = list.filter((_, i) => i >= (this.state.page.current-1) * this.state.page.pageSize && i < (this.state.page.current) * this.state.page.pageSize).map((item,index) => {
      return <AtListItem onClick={this.navigateTo.bind(this,'/pages/gushi/gushi?id='+item._id)} title={item.title} arrow='right' extraText={item.author}></AtListItem>
    })

    return (this.state.loading ||
      <View className='at-article' id="author">
        <View className='at-article__h2'>
          {title
            && <AtCard title={title} key={_id}>
                {image && <Image className='at-article__img' src={image} mode='aspectFit' />}
                <View>{desc}</View>
              </AtCard>
          }
        </View>
        <View className='at-article__p'>
          <AtList>
            {listCont}
          </AtList>
        </View>
        <View>{content}</View>
      </View>
    )

    // WxParse.wxParse('current_question_content', 'html', this.data.current_question.content, this, 5)
    // return (this.state.loading
    //   ? null
    //   : <View className='at-article' id="author">
    //     <View className='at-article__h2'>
    //       <AtCard title={this.state.item.title} key={this.state.item._id}>
    //         { 
    //           // this.state.item.image ? <Image className='at-article__img' src={this.state.item.image} mode='aspectFit' /> : '' 
    //         }
    //         <View>{this.state.item.desc}</View>
    //       </AtCard>
    //     </View>
    //     <View className='at-article__p'>
    //       <AtList>
    //         { 
    //           // this.state.list.filter((_, i) => i >= (this.state.page.current-1) * this.state.page.pageSize && i < (this.state.page.current) * this.state.page.pageSize).map((item,index) => {
    //           //   return <AtListItem onClick={this.navigateTo.bind(this,'/pages/gushi/gushi?id='+item._id)} title={item.title} arrow='right' extraText={item.author}></AtListItem>
    //           // })
    //         }
    //       </AtList>
    //     </View>
    //     <View className='at-article__p'>
    //       {
    //         this.state.list.length > 0 ?
    //         <AtPagination onPageChange={this.onPageChange.bind(this)} icon total={this.state.page.total} pageSize={this.state.page.pageSize} current={this.state.page.current}></AtPagination> : ''}
    //     </View>
    //     <View className='at-article__content'>
    //       {content}
    //     </View>
    //   </View>
    // )
      
  }
}

