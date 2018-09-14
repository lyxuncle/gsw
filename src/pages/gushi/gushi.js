import Taro, { Component } from '@tarojs/taro'
import { View,ScrollView,Input,Image} from '@tarojs/components'
import { AtTag, AtTabs, AtTabsPane, AtNavBar } from 'taro-ui'
import './gushi.css'

export default class Gushi extends Component {
  config = {
    navigationBarTitleText: '古诗'
  }
  constructor() {
    super(...arguments)
    this.state = {
      loading:false,
      item:null,
      current:0,
      tabList:[]
    }
  }
  handleClick (value) {
    this.setState({
      current: value
    })
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
      url: 'https://www.fatedestiny.fun/?c=fd_gushiwen&m=single_gushiwen&id='+this.state.gid
    }).then(res => {
      Taro.hideLoading()
      if (res.data.status == 200) {
        let item = res.data.data, tabList = []
        if (!!item.yiwenjizhushi == true) {
          tabList.push({title:'译文及注释',idx:'yiwenjizhushi'})
        }

        if (!!item.chuangzuobeijing == true) {
          tabList.push({title:'创作背景',idx:'chuangzuobeijing'})
        }

        if (item.shangxi_id.length>0) {
          item.shangxi_id.map((sxid,index) => {
            tabList.push({title:item['shangxi_title_'+sxid],idx:'shangxi_'+sxid})
          })
        }

        if (item.fanyi_id.length>0) {
          item.fanyi_id.map((sxid,index) => {
            tabList.push({title:item['fanyi_title_'+sxid],idx:'fanyi_'+sxid})
          })
        }
        this.setState({
          loading: false,
          item: item,
          tabList:tabList
        })
      }
    })
  }
  
  handleBack = () => {
    Taro.navigateBack()
  }
  render () {
      return this.state.item!=null ? (
          <View className='at-article' >
            <AtNavBar leftIconType='chevron-left' onClickLeftIcon={this.handleBack} color='#000' title='' rightFirstIconType='star'/>
            <View className='at-article__h1'>
              {this.state.item.title}
            </View>
            <View className='at-article__info'>
              <View className='at-article__section'>
              作者：{this.state.item.author}（ {this.state.item.dynasty} ）
              </View>
            </View>

            <View className='at-article__content'>

              <View className='at-article__section'>
                <View className='at-article__h2'>原文</View>
                <View className='at-article__p' dangerouslySetInnerHTML={{__html: this.state.item.content}}>                  
                </View>
              </View>

              <View className='at-article__section'>
              {
                this.state.item.tag ?
                this.state.item.tag.map((item,index) => {
                  return (<View className='subitem'><AtTag active size='small' type='primary' circle>{item}</AtTag></View>)
                }) : ''
              }
              </View>

              <View className='panel'>
                <View className='panel__content'>
                  <AtTabs scroll onClick={this.handleClick.bind(this)} current={this.state.current} tabList={this.state.tabList}>
                  {
                    this.state.tabList.map((tab,idx) => {
                      if (tab.idx == 'yiwenjizhushi') {
                        return  <AtTabsPane current={this.state.current} index={idx}>
                            <View className='tab-content'>
                              <View className='at-article__section'>
                                <View className='at-article__p' dangerouslySetInnerHTML={{__html: this.state.item.yiwenjizhushi}}>
                                </View>
                              </View>
                            </View>
                          </AtTabsPane>
                      } else if (tab.idx == 'chuangzuobeijing') {
                        return <AtTabsPane current={this.state.current} index={idx}>
                          <View className='tab-content'>
                            <View className='at-article__section'>
                              <View className='at-article__p' dangerouslySetInnerHTML={{__html: this.state.item.chuangzuobeijing}}>
                              </View>
                            </View>
                          </View>
                        </AtTabsPane>
                      } else if (tab.idx.indexOf('shangxi') !== -1) {
                        return <AtTabsPane current={this.state.current} index={idx}>
                          <View className='tab-content'>
                            <View className='at-article__section'><View className='at-article__p' dangerouslySetInnerHTML={{__html: this.state.item[tab.idx]}}></View></View>
                          </View>
                        </AtTabsPane>
                      } else if (tab.idx.indexOf('fanyi') !== -1) {
                        return <AtTabsPane current={this.state.current} index={idx}>
                          <View className='tab-content'>
                            <View className='at-article__section'><View className='at-article__p' dangerouslySetInnerHTML={{__html: this.state.item[tab.idx]}}></View></View>
                          </View>
                        </AtTabsPane>
                      } 
                    })
                  } 
                  </AtTabs>
                </View>
              </View>
            </View>
          </View>
      ) : null
  }
}

