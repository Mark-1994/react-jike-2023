import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { getChannelsAPI, createArticleAPI, getArticleDetailAPI, updateArticleAPI } from '@/apis/publish'
import { useEffect, useState } from 'react'

const { Option } = Select

const Publish = () => {
  const navigate = useNavigate()
  // 获取频道列表
  const [channelList, setChannelList] = useState([])
  useEffect(() => {
    getChannelsAPI().then((res) => {
      setChannelList(res.data.channels)
    })
  }, [])
  // 提交表单
  const onFinish = async (values) => {
    const { title, content, channel_id, type } = values
    // 校验封面类型和实际上传图片数量
    if (type !== imageList.length) return message.warning('封面类型和图片数量不一致')
    const reqData = {
      title,
      content,
      cover: { type, images: imageList.map(item => item.url || item.response.data.url) },
      channel_id,
      id: articleId
    }
    if (articleId) {
      await updateArticleAPI(reqData)
      message.success('编辑文章成功')
      navigate('/article')
    } else {
      await createArticleAPI(reqData)
      message.success('发布文章成功')
      navigate('/article')
    }
  }
  // 上传回调
  const [imageList, setImageList] = useState([])
  const onChange = (info) => {
    setImageList(info.fileList)
  }
  // 切换图片封面类型
  const [imageType, setImageType] = useState(1)
  const onTypeChange = (e) => {
    setImageType(e.target.value)
  }
  // 回填数据
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')
  // 获取表单实例
  const [form] = Form.useForm()
  useEffect(() => {
    if (!articleId) return
    getArticleDetailAPI(articleId).then((res) => {
      form.setFieldsValue({
        ...res.data,
        type: res.data.cover.type,
        images: res.data.cover.images.map(item => ({ url: item }))
      })
      setImageType(res.data.cover.type)
      setImageList(res.data.cover.images.map(item => ({ url: item })))
    })
  }, [articleId, form])
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">" items={[
            { title: <Link to="/">首页</Link> },
            { title: `${articleId ? '编辑' : '发布'}文章` }
          ]} />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 && <Upload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList
              action="https://geek.itheima.net/v1_0/upload"
              onChange={onChange}
              maxCount={imageType}
              fileList={imageList}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            {/* 富文本编辑器 */}
            <ReactQuill className="publish-quill" theme="snow" placeholder="请输入文章内容" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish
