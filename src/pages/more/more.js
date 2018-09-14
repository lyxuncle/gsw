import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image} from '@tarojs/components'
import { AtAvatar,AtList,AtListItem } from 'taro-ui'
import './more.scss'

import recentPng from '../../asset/images/recent.png'
import favPng from '../../asset/images/star2.png'


export default class More extends Component {
  config = {
    navigationBarTitleText: '我'
  }
  render () {
    return (
      <View className='more'>
        <View className='user flex-wrp'>
          <AtAvatar size='large' circle image='https://jdc.jd.com/img/400'></AtAvatar>
        </View>
        <AtList>
          <AtListItem title='我的历史' arrow='right' thumb={recentPng} />
          <AtListItem title='我的收藏' arrow='right' thumb={favPng} />
        </AtList>
      </View>
    )
  }
}

