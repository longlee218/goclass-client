import { Button, Col, Form, Row, Upload } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DrawerBase from '../DrawerBase';
import ImgCrop from 'antd-img-crop';
import TextArea from 'antd/lib/input/TextArea';
import classRoomActions from '../../../redux/class_room/class_room.action';
import { notifySocket } from '../../../services/socket.service';

const NotifyDrawer = ({ classRoom, visible, setVisible }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const onChangeFile = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onClose = () => {
    setVisible(false);
    form.setFieldsValue({
      content: '',
    });
    setIsLoading(false);
  };

  const onFinish = (values) => {
    setIsLoading(true);
    dispatch(classRoomActions.createAlert(classRoom._id, values.content))
      .then(() => {
        dispatch(classRoomActions.getAlert(classRoom._id));
        notifySocket.emit(
          'notify-class',
          classRoom._id, // id classroom
          classRoom.name, // name of class room
          user._id, // id of user create
          user.fullname, // name of user create
          (window.location.pathname + '?tab=noti').replace('/teacher', '')
        );
        onClose();
      })
      .catch((error) => {
        console.log('error from drawer:::', error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <DrawerBase
      key='add-notify-drawer'
      className='add-notify-drawer'
      title='Thông báo'
      onClose={onClose}
      visible={visible}
    >
      {visible && (
        <Form
          layout='vertical'
          requiredMark={false}
          onFinish={onFinish}
          form={form}
        >
          <Row gutter={16} style={{ marginRight: 0 }}>
            <Col span={24}>
              <Form.Item
                name='content'
                label='Nội dung'
                rules={[{ required: true, message: 'Không được bỏ trống' }]}
              >
                <TextArea
                  rows={8}
                  showCount
                  name='content'
                  placeholder='VD. Thông báo thứ 3 sẽ kiểm tra'
                />
              </Form.Item>
            </Col>
          </Row>
          {/* <Row gutter={16} style={{ marginRight: 0 }}>
            <Col span={24}>
              <Form.Item label='Đính kèm'>
                <Form.Item name='attach' valuePropName='fileList' noStyle>
                  <ImgCrop rotate>
                    <Upload
                      name='file'
                      multiple
                      showUploadList={true}
                      action={'/uploads/' + classRoom._id}
                      fileList={fileList}
                      onChange={onChangeFile}
                      onPreview={onPreview}
                      listType='picture-card'
                    >
                      {fileList.length < 5 && '+ Tải lên'}
                    </Upload>
                  </ImgCrop>
                </Form.Item>
              </Form.Item>
            </Col>
          </Row> */}
          <Row gutter={16} style={{ marginRight: 0 }}>
            <Col span={24}>
              <Form.Item>
                <Button
                  type='primary'
                  className='btn-success'
                  shape='round'
                  htmlType='submit'
                  loading={isLoading}
                >
                  Lưu
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </DrawerBase>
  );
};

export default NotifyDrawer;
