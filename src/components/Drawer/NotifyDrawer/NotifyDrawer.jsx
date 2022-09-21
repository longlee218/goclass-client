import { Button, Col, Form, Row, Upload } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DrawerBase from '../DrawerBase';
import TextArea from 'antd/lib/input/TextArea';
import classRoomActions from '../../../redux/class_room/class_room.action';
import classRoomService from '../../../services/classRoom.service';
import { notifySocket } from '../../../services/socket.service';
import { useEffect } from 'react';

const NotifyDrawer = ({ classRoom, visible, setVisible, alert, setAlert }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const [fileList, setFileList] = useState([]);
  const [fileListHandle, setFileListHandle] = useState([]);

  useEffect(() => {
    if (alert) {
      form.setFieldsValue({
        _id: alert._id,
        content: alert.content,
      });
      setFileList(
        alert.attachments.map((attach) => ({
          uid: attach.uid,
          name: attach.originalname,
          url: process.env.REACT_APP_BACKEND_URL + attach.dest,
        }))
      );
    } else {
      form.setFieldsValue({
        _id: '',
        content: '',
      });
    }
  }, [form, alert]);

  const onChangeFile = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setFileListHandle(newFileList);
  };

  const onRemove = (file) => {
    const filesRemain = fileList.filter((v) => v.uid !== file.uid);
    if (onChangeFile) {
      onChangeFile({ fileList: filesRemain });
    }
    classRoomService
      .removeFileAlertInClass(alert._id, {
        dest: file.url.replace(process.env.REACT_APP_BACKEND_URL, ''),
        originalname: file.name,
      })
      .then(() => dispatch(classRoomActions.getAlert(classRoom._id)));
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
    setFileList([]);
    setFileListHandle([]);
    setIsLoading(false);
  };

  const onFinish = (values) => {
    setIsLoading(true);

    // means update
    const formData = new FormData();
    formData.append('content', values.content);
    fileListHandle.forEach((file) => {
      formData.append('files', file.originFileObj);
    });
    if (values._id) {
      dispatch(classRoomActions.updateAlert(values._id, formData))
        .then(() => {
          dispatch(classRoomActions.getAlert(classRoom._id));
          setAlert(null);
          onClose();
        })
        .finally(() => setIsLoading(false));
    } else {
      dispatch(classRoomActions.createAlert(classRoom._id, formData))
        .then(() => {
          dispatch(classRoomActions.getAlert(classRoom._id));
          if (classRoom.isSendNotify) {
            notifySocket.emit(
              'notify-class',
              classRoom._id, // id classroom
              classRoom.name, // name of class room
              user._id, // id of user create
              user.fullname, // name of user create
              (window.location.pathname + '?tab=noti').replace('/teacher', '')
            );
          }
          onClose();
        })
        .finally(() => setIsLoading(false));
    }
  };

  const handleKeyDown = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight + 20}px`;
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
                  rows={10}
                  showCount
                  name='content'
                  placeholder='VD. Thông báo thứ 3 sẽ kiểm tra'
                  onKeyDown={handleKeyDown}
                  onMouseDown={handleKeyDown}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginRight: 0 }}>
            <Col span={24}>
              <Form.Item label='Đính kèm'>
                <Form.Item name='attach' noStyle>
                  {/* <ImgCrop rotate> */}
                  <Upload.Dragger
                    name='file'
                    multiple
                    showUploadList={true}
                    beforeUpload={() => false}
                    fileList={fileList}
                    onChange={onChangeFile}
                    onPreview={onPreview}
                    onRemove={onRemove}
                    listType='text'
                    style={{ padding: '35px 15px' }}
                  >
                    {fileListHandle.length + fileList.length <= 5 ? (
                      <>Kéo thả hoặc click vào đây</>
                    ) : (
                      <>Giới hạn 5 file mỗi lần upload</>
                    )}
                  </Upload.Dragger>
                  {/* </ImgCrop> */}
                </Form.Item>
              </Form.Item>
            </Col>
          </Row>
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
          <Form.Item>
            <Form.Item name='_id' noStyle style={{ display: 'none' }}>
              <input hidden name='_id' />
            </Form.Item>
          </Form.Item>
        </Form>
      )}
    </DrawerBase>
  );
};

export default NotifyDrawer;
