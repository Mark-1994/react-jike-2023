// 封装获取频道列表的逻辑
import { useEffect, useState } from 'react'
import { getChannelsAPI } from '@/apis/publish'

const useChannel = () => {
  const [channelList, setChannelList] = useState([])
  useEffect(() => {
    getChannelsAPI().then((res) => {
      setChannelList(res.data.channels)
    })
  }, [])
  return {
    channelList
  }
}

export {
  useChannel
}
