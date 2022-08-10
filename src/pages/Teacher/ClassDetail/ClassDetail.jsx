import './style.css';

import { Button, Modal, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StudentAddedDrawer } from '../../../components/Drawer';
import TableStudent from '../../../components/TableStudent';
import alertActions from '../../../redux/alert/alert.action';
import classRoomActions from '../../../redux/class_room/class_room.action';
import classRoomService from '../../../services/classRoom.service';
import studentActions from '../../../redux/student/student.action';
import { studentSelector } from '../../../redux/student/student.selector';
import { useAppContext } from '../../../hooks/useAppContext';
import { useParams } from 'react-router';

const ClassDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [classRoom, setClassRoom] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const paginateStudents = useSelector(studentSelector);
  const [studentSelect, setStudentSelect] = useState(undefined);
  const [triggerClass, setTriggerClass] = useState(false);
  const { setTitleHeader } = useAppContext();
  const [isShowAddedDrawer, setIsShowAddedDrawer] = useState(false);

  useEffect(() => {
    if (classRoom) {
      setTitleHeader(classRoom.name);
    }
    return () => setTitleHeader('');
  }, [setTitleHeader, classRoom, dispatch]);

  useEffect(() => {
    classRoomService
      .findById(params.id)
      .then((data) => {
        setClassRoom(data);
      })
      .catch((error) => dispatch(alertActions.error(error.message)));
  }, [dispatch, params, triggerClass]);

  useEffect(() => {
    dispatch(studentActions.get(params.id, { page, limit })).then(() =>
      setLoading(false)
    );
  }, [params, dispatch, page, limit]);

  const onEditStudent = (id) => {
    const student = paginateStudents.students.find(({ _id }) => _id === id);
    setStudentSelect(student);
    setIsShowAddedDrawer(true);
  };

  const onRemoveStudent = (id) => {
    const student = paginateStudents.students.find(({ _id }) => _id === id);
    Modal.confirm({
      title: 'Xác nhận',
      content: (
        <>
          Bạn có chắc muốn xóa <b>{student.studentName}</b> khỏi lớp ?
        </>
      ),
      okText: 'Tiếp tục',
      cancelText: 'Hủy',
      closable: true,
      okButtonProps: {
        danger: true,
      },
      onOk: () => {
        dispatch(studentActions.delete(classRoom._id, student._id)).then(() =>
          dispatch(studentActions.get(classRoom._id, {}))
        );
      },
    });
  };

  const onChangeDesc = (text) => {
    classRoomService
      .update(
        {
          desc: text,
          session: classRoom.session,
          name: classRoom.name,
          classRoomGroupId: classRoom.classRoomGroupId,
        },
        classRoom._id
      )
      .then(() => setTriggerClass(!triggerClass));
  };

  return (
    <>
      <div className='class-detail_wrapper'>
        <Space direction='vertical' size={16} style={{ width: '100%' }}>
          <div className='d-flex justify-content-between'>
            <Space size={32}>
              <Typography.Text>
                Lớp: <b>{classRoom?.name}</b>
              </Typography.Text>
              <Typography.Text>
                Sĩ số: <b>{classRoom?.countStudents}</b>
              </Typography.Text>
              <Typography.Text>
                Mã lớp:&nbsp;
                <Typography.Text strong copyable type='danger'>
                  {classRoom?.hashId}
                </Typography.Text>
              </Typography.Text>
            </Space>
            <Button
              type='primary'
              danger
              shape='round'
              onClick={() => setIsShowAddedDrawer(true)}
            >
              Thêm học sinh
            </Button>
          </div>
          <Typography.Paragraph
            editable={{
              tooltip: 'Sửa mô tả lớp học',
              onChange: onChangeDesc,
            }}
          >
            {classRoom?.desc}
          </Typography.Paragraph>
        </Space>
      </div>

      <TableStudent
        paginateStudents={paginateStudents}
        classInfo={classRoom}
        setVisibleDrawer={setIsShowAddedDrawer}
        setPage={setPage}
        page={page}
        limit={limit}
        setLimit={setLimit}
        onEditStudent={onEditStudent}
        onRemoveStudent={onRemoveStudent}
        loading={loading}
        setLoading={setLoading}
      />
      {classRoom && (
        <StudentAddedDrawer
          visible={isShowAddedDrawer}
          setVisible={setIsShowAddedDrawer}
          classId={classRoom._id}
          studentInfo={studentSelect}
          setStudentInfo={setStudentSelect}
        />
      )}
    </>
  );
};

export default ClassDetail;
