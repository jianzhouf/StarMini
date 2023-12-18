import { useState } from 'react';
import { View, Image } from '@tarojs/components'
import Taro, { useLoad, request, useRouter } from '@tarojs/taro'
import { AtRate } from 'taro-ui';
import './index.scss'

export default function Detail() {
  const [data, setData] = useState<any>({});
  // const data = {
  //   '白羊座': {
  //     'dateStr': '3月21日-4月19日',
  //     'overview': '事业方面，你可能会遇到一些挑战，但是你有足够的勇气和决心去克服困难。财务方面，你可能会有一些额外的支出，需要合理规划和管理资金。感情方面，如果你是单身，可能会有一些机会出现，但需要保持开放的心态。如果你已经有伴侣，今天可能需要更多的沟通和理解。总体来说，今天的运势相对平稳，只要保持积极的态度，你可以度过一天。',
  //   }
  // }
  const params = useRouter().params;

  useLoad(() => {
    console.log('Page loaded.')
    //十二星座对应英文小写，aries, taurus, gemini, cancer, leo, virgo, libra, scorpio, sagittarius, capricorn, aquarius, pisces
    // 今日明日一周等运势,today, nextday, week, month, year, love
    const map = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
    console.log(params)
    request({
      url: `https://api.vvhan.com/api/horoscope?type=${map[params.index]}&time=today`,
      method: 'GET',
    }).then(res => {
      console.log(res)
      if (res.statusCode === 200) {
        setData(res.data.data)
        Taro.setNavigationBarTitle({
          title: res.data.data.title
        })
      }
    })
  })

  return (
    <View className='p-detail'>
      {/* <View className='title'>{data.title}</View> */}
      {/* <View className='date'>{data['白羊座']?.dateStr}</View> */}

      <View className='box'>
        <View className='title'>{data.title}（{data.time}）</View>
        <View className='shortcomment'>{data?.shortcomment}</View>
      </View>
      <View className='main'>

        <View className='content'>
          <View className='label'><View className='label-text'>今日运势</View><AtRate size={16} value={data?.fortune?.all} /></View>
          <View className='block-list'>
            <View className='block'>
              <View className='block-label'>幸运色</View>
              <View className='block-color'>{data?.luckycolor}</View>
            </View>
            <View className='block'>
              <View className='block-label'>幸运数字</View>
              <View className='block-color'>{data?.luckynumber}</View>
            </View>
            <View className='block'>
              <View className='block-label'>速配星座</View>
              <View className='block-color'>{data?.luckyconstellation}</View>
            </View>
          </View>
          <View className='overview'>{data?.fortunetext?.all}</View>
        </View>
        <View className='content'>
          <View className='label'><View className='label-text'>健康运势</View><AtRate size={16} value={data?.fortune?.health} /></View>
          <View className='overview'>{data?.fortunetext?.health}</View>
        </View>
        <View className='content'>
          <View className='label'><View className='label-text'>爱情运势</View><AtRate size={16} value={data?.fortune?.love} /></View>
          <View className='overview'>{data?.fortunetext?.love}</View>
        </View>
        <View className='content'>
          <View className='label'><View className='label-text'>财富运势</View><AtRate size={16} value={data?.fortune?.money} /></View>
          <View className='overview'>{data?.fortunetext?.money}</View>
        </View>
        <View className='content'>
          <View className='label'><View className='label-text'>事业运势</View><AtRate size={16} value={data?.fortune?.work} /></View>
          <View className='overview'>{data?.fortunetext?.work}</View>
        </View>

        {/* <View>
          <View>宜</View>
          <View>{data?.todo?.yi}</View>
          <View>忌</View>
          <View>{data?.todo?.ji}</View>
        </View> */}
      </View>
    </View>
  )
}
