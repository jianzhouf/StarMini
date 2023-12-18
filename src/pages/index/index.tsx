import { useState } from 'react';
import { View, Text, Image } from '@tarojs/components'
import { useLoad, navigateTo, useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import {AtButton as Button} from 'taro-ui'
import './index.scss'
import baiyang from '../../images/muyangzuo.png';
import jinniu from '../../images/jinniuzuo.png';
import shuangzi from '../../images/shuangzizuo.png';
import juxie from '../../images/juxiezuo.png';
import shizi from '../../images/shizizuo.png';
import chunv from '../../images/chunvzuo.png';
import tiancheng from '../../images/tianchengzuo.png';
import tianxie from '../../images/tianxiezuo.png';
import sheshou from '../../images/sheshouzuo.png';
import mojie from '../../images/mojiezuo.png';
import shuiping from '../../images/shuipingzuo.png';
import shuangyu from '../../images/shuangyuzuo.png';


export default function Index() {
  const [data, setData] = useState<any>({});
  const starList = [
    {
      "name": "白羊座",
      "img": baiyang,
      "dateStr": "3月21日 - 4月19日",
    },
    {
      "name": "金牛座",
      "img": jinniu,
      "dateStr": "4月20日 - 5月20日"
    },
    {
      "name": "双子座",
      "img": shuangzi,
      "dateStr": "5月21日 - 6月20日"
    },
    {
      "name": "巨蟹座",
      "img": juxie,
      "dateStr": "6月21日 - 7月22日"
    },
    {
      "name": "狮子座",
      "img": shizi,
      "dateStr": "7月23日 - 8月22日"
    },
    {
      "name": "处女座",
      "img": chunv,
      "dateStr": "8月23日 - 9月22日"
    },
    {
      "name": "天秤座",
      "img": tiancheng,
      "dateStr": "9月23日 - 10月22日"
    },
    {
      "name": "天蝎座",
      "img": tianxie,
      "dateStr": "10月23日 - 11月21日"
    },
    {
      "name": "射手座",
      "img": sheshou,
      "dateStr": "11月22日 - 12月21日"
    },
    {
      "name": "摩羯座",
      "img": mojie,
      "dateStr": "12月22日 - 1月19日"
    },
    {
      "name": "水瓶座",
      "img": shuiping,
      "dateStr": "1月20日 - 2月18日"
    },
    {
      "name": "双鱼座",
      "img": shuangyu,
      "dateStr": "2月19日 - 3月20日"
    }
  ]

  useLoad(() => {
    console.log('Page loaded.')

    // request({
    //   url: 'https://api.vvhan.com/api/horoscope?type=aries&time=today',
    //   method: 'GET',
    // }).then(res => {
    //   console.log(res)
    //   if (res.statusCode === 200) {
    //     setData(res.data.data)
    //   }
    // })
  })

  useShareAppMessage((params)=> {
    return {
      title: '星座每日运势查询',
      path: '/pages/index/index',
    }
  })

  useShareTimeline(()=>{
    return {
      title: '星座每日运势查询',
    }
  })

  function handleClick(index) {
    navigateTo({
      url: '/pages/detail/index?index=' + index
    })
  }

  function renderDateStr(str) {
    const [a,b] = str.split(' - ');
    return str.replaceAll('月', '.').replaceAll('日', '').replace(' - ', '~')
    // return  <View>
    //   <View>{a}~</View>
    //   <View>{b}</View>
    // </View>
  }

  return (
    <View className='p-index'>
      <View>
        <View className='container'>
          <View className='title'>星座运势</View>
          {starList.map((item, index) => (<View className='list-item' key={item.name}  onClick={()=>handleClick(index)}>
            <View className='item' key={index}>
              <View className='img-wrapper'>
                <Image className='img' src={item.img} />
              </View>
              <View className='name'>{item.name}</View>
              <View className='date'>{renderDateStr(item.dateStr)}</View>
            </View>
          </View>))}

          <Button className='btn' type='primary' openType='share' full>分享给朋友</Button>
        </View>
      </View>
    </View>
  )
}
