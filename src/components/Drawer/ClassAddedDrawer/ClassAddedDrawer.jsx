import './style.css';

import { Button, Col, Form, Input, Radio, Row, Select } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DrawerBase from '../DrawerBase';
import alertActions from '../../../redux/alert/alert.action';
import classGroupActions from '../../../redux/class_group/class_group.action';
import classRoomActions from '../../../redux/class_room/class_room.action';
import { classRoomFindBydId } from '../../../redux/class_room/class_room.selector';
import classRoomService from '../../../services/classRoom.service';
import { useEffect } from 'react';

const { Option } = Select;

const OTHER_GROUP = {
  value: 0,
  name: 'Khác',
};

const VALUES_SESSION = new Array(60)
  .fill()
  .map((_, i) => `${2020 + i}-${2020 + i + 1}`);

const LIST_COLOR_RGB = [
  '',
  'rgb(45, 204, 247)',
  'rgb(255, 160, 69)',
  'rgb(205, 110, 222)',
  'rgb(240, 78, 143)',
  'rgb(245, 198, 49)',
  'rgb(21, 202, 154)',
  'rgb(130, 143, 153)',
  'rgb(255, 187, 187)',
  'rgb(233, 85, 45)',
  'rgb(140, 82, 37)',
  'rgb(157, 238, 242)',
  'rgb(200, 237, 128)',
];

const ClassAddedDrawer = ({ visible, setVisible }) => {
  const dispatch = useDispatch();
  const classGroups = useSelector((state) => state.classGroup);
  const classRoom = useSelector(classRoomFindBydId);
  const [listGroup, setListGroup] = useState([OTHER_GROUP]);
  const [nameGroup, setNameGroup] = useState('');
  const [valueRadio, setValueRadio] = useState(0);
  const [isLoadingGroup, setIsLoadingGroup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sthChange, setSthChange] = useState(false);

  useEffect(() => {
    if (classRoom) {
      setValueRadio(classRoom?.classRoomGroupId || 0);
    }
  }, [classRoom]);

  useEffect(() => {
    const listGroupRadio = classGroups?.map(({ _id, name }) => ({
      value: _id,
      name,
    }));
    setListGroup(() => {
      return [OTHER_GROUP, ...listGroupRadio];
    });
    if (sthChange) {
      setValueRadio(sthChange);
    }
  }, [sthChange, classGroups]);

  useEffect(() => {
    dispatch(classGroupActions.get());
  }, [dispatch]);

  const onClose = () => {
    setValueRadio(0);
    setVisible(false);
    dispatch(classRoomActions.find(null));
  };

  const onChangeRadio = (e) => {
    setValueRadio(e.target.value);
  };

  const onCreateGroup = (e) => {
    e.preventDefault();
    if (nameGroup) {
      setIsLoadingGroup(true);
      dispatch(classGroupActions.create(nameGroup))
        .then((data) => {
          setNameGroup(null);
          setSthChange(data._id);
        })
        .then(() => {
          dispatch(classRoomActions.get());
        })
        .finally(() => setIsLoadingGroup(false));
    }
  };

  const onFinish = (values) => {
    dispatch(alertActions.loading());
    setIsLoading(true);
    let promiseAction = null;
    if (classRoom?._id) {
      promiseAction = classRoomService.update(
        {
          ...values,
          ...(valueRadio !== 0 ? { classRoomGroupId: valueRadio } : {}),
        },
        classRoom._id
      );
    } else {
      console.log({
        ...values,
        ...(valueRadio !== 0 ? { classRoomGroupId: valueRadio } : {}),
      });
      promiseAction = classRoomService.create({
        ...values,
        ...(valueRadio !== 0 ? { classRoomGroupId: valueRadio } : {}),
      });
    }
    promiseAction
      .then(() => {
        dispatch(alertActions.success());
        dispatch(classRoomActions.get());
        onClose();
      })
      .catch((error) => dispatch(alertActions.error(error.message)))
      .finally(() => setIsLoading(false));
  };

  return (
    <DrawerBase
      key='add-student-drawer'
      className='add-student-drawer'
      title={classRoom?._id ? 'Sửa lớp' : 'Thêm mới lớp'}
      onClose={onClose}
      visible={visible}
    >
      {visible && (
        <Form
          layout='vertical'
          requiredMark={false}
          onFinish={onFinish}
          initialValues={{
            name: classRoom?.name ?? '',
            session: classRoom?.session ?? '',
            desc: classRoom?.desc ?? '',
          }}
        >
          <Row gutter={16} style={{ marginRight: 0 }}>
            <Col span={24}>
              <Form.Item
                name='name'
                label='Tên lớp'
                rules={[{ required: true, message: 'Vui lòng nhập tên lớp' }]}
              >
                <Input placeholder='VD. Lớp Toán 12' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginRight: 0 }}>
            <Col span={24}>
              <Form.Item
                name='session'
                label='Năm học'
                rules={[{ required: true, message: 'Vui lòng chọn năm học' }]}
              >
                <Select placeholder='VD. Năm học 2021-2022'>
                  {VALUES_SESSION.map((value, index) => (
                    <Option key={index} value={value}>
                      {value}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginRight: 0 }} name='classRoomGroupId'>
            <Col span={24}>
              <Form.Item label='Nhóm lớp học'>
                {listGroup.map(({ value, name }) => (
                  <Radio
                    key={value}
                    value={value}
                    onChange={onChangeRadio}
                    checked={value === valueRadio}
                    name='classRoomGroupId'
                  >
                    {name}
                  </Radio>
                ))}
                <Radio
                  key={1}
                  value={1}
                  onChange={onChangeRadio}
                  checked={1 === valueRadio}
                >
                  Tạo Nhóm mới
                  {valueRadio === 1 && (
                    <Form
                      layout='inline'
                      style={{ display: 'inline-flex', marginLeft: 8 }}
                    >
                      <Form.Item
                        name='group_name'
                        rules={[
                          {
                            required: true,
                            message: 'Không được bỏ trống.',
                          },
                        ]}
                      >
                        <Input
                          name='group_name'
                          placeholder='VD. Nhóm Khối 12'
                          style={{ width: 150 }}
                          size='small'
                          onChange={(e) => setNameGroup(e.target.value)}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          size='small'
                          type='primary'
                          onClick={onCreateGroup}
                          loading={isLoadingGroup}
                        >
                          Tạo
                        </Button>
                      </Form.Item>
                    </Form>
                  )}
                </Radio>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginRight: 0 }}>
            <Col span={24}>
              <Form.Item name='color' label='Màu sắc'>
                <Select
                  name='color'
                  defaultValue={LIST_COLOR_RGB[1]}
                  style={{ width: 'auto' }}
                >
                  {LIST_COLOR_RGB.map((colorCode, i) => (
                    <Option key={i} value={colorCode}>
                      <div
                        className='color-circle-select'
                        style={{ backgroundColor: colorCode }}
                      />
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginRight: 0 }}>
            <Col span={24}>
              <Form.Item name='desc' label='Mô tả'>
                <Input.TextArea
                  rows={4}
                  showCount
                  maxLength={200}
                  name='desc'
                  placeholder='VD. Lớp Toán 12 học vào buổi chiều'
                />
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
        </Form>
      )}
    </DrawerBase>
  );
};

export default ClassAddedDrawer;
