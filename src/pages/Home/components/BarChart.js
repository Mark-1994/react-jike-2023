// 封装柱状图组件
import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

const BarChart = ({ title }) => {
  const chartRef = useRef(null)
  // 图表实例
  const chartInstance = useRef(null)
  // 初始化图表（仅在组件挂载时执行一次）
  useEffect(() => {
    // 保证dom节点已经渲染完成
    // 渲染图标的dom节点
    const chartDom = chartRef.current
    // 图表初始化生成图表实例对象
    const myChart = echarts.init(chartDom)
    chartInstance.current = myChart
    // 监听窗口大小变化，让图表自适应
    const handleResize = () => myChart.resize()
    window.addEventListener('resize', handleResize)
    // 组件卸载时销毁实例，移除监听
    return () => {
      window.removeEventListener('resize', handleResize)
      myChart.dispose()
      chartInstance.current = null
    }
  }, [])
  // 更新图表数据（title 变化时执行）
  useEffect(() => {
    // 确保实例已经存在
    if (chartInstance.current) {
      // 图表参数
      const option = {
        title: {
          text: title
        },
        xAxis: {
          type: 'category',
          data: ['Vue', 'React', 'Angular']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [10, 40, 70],
            type: 'bar'
          }
        ]
      }
      // 使用图表参数完成图表的渲染
      chartInstance.current.setOption(option)
    }
  }, [title])
  return <div ref={chartRef} style={{ width: '500px', height: '400px' }}></div>
}

export default BarChart
