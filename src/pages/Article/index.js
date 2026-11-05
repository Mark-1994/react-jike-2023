import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Table, Tag, Space, Popconfirm } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useChannel } from '@/hooks/useChannel'
import { getArticleListAPI, delArticleAPI } from '@/apis/article'
import { useState, useEffect } from 'react'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  const { channelList } = useChannel()
  const status = {
    1: <Tag color="orange">待审核</Tag>,
    2: <Tag color="green">审核通过</Tag>,
    3: <Tag color="red">审核失败</Tag>,
    4: <Tag color="red">已删除</Tag>
  }
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width:120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => status[data]
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Popconfirm title="删除文章" description="确认要删除当前文章吗？" onConfirm={() => onConfirm(data.id)} okText="是" cancelText="否">
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]
  const [reqData, setReqData] = useState({
    status: '',
    channel_id: '',
    begin_publish: '',
    end_publish: '',
    page: 1,
    per_page: 10
  })
  // 获取文章列表
  const [list, setList] = useState([])
  const [count, setCount] = useState(0)
  // useEffect 副作用有一个特点，依赖项数据[reqData]一旦发生改变，就会重新执行 useEffect 副作用函数
  useEffect(() => {
    getArticleListAPI(reqData).then(res => {
      setList(res.data.results)
      setCount(res.data.total_count)
    })
  }, [reqData])
  // 筛选逻辑
  const onFinish = values => {
    setReqData({
      ...reqData,
      channel_id: values.channel_id,
      status: values.status,
      begin_publish: values.date ? values.date[0].format('YYYY-MM-DD') : '',
      end_publish: values.date ? values.date[1].format('YYYY-MM-DD') : ''
    })
  }
  // 分页回调函数
  const onPageChange = (page, pageSize) => {
    setReqData({
      ...reqData,
      page,
      per_page: pageSize
    })
  }
  // 删除
  const onConfirm = async (id) => {
    await delArticleAPI(id)
    setReqData({
      ...reqData
    })
  }
  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">" items={[
            { title: <Link to="/">首页</Link> },
            { title: '内容管理' }
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: undefined }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={undefined}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            >
              {channelList.map(item => (
                <Option key={item.id} value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格区域 */}
      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={list} pagination={{ total: count, pageSize: reqData.per_page, onChange: onPageChange }} />
      </Card>
    </div>
  )
}

export default Article
