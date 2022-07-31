import React, { useEffect, useRef, useState } from 'react';

import { StudentAddedDrawer } from '../../../components/Drawer';
import TableStudent from '../../../components/TableStudent';
import { useAppContext } from '../../../hooks/useAppContext';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

const data = [
  {
    key: '1',
    name: 'Le Hoang Long',
    gender: 'Nam',
    email: 'longle@gmail.com',
    isExist: false,
    infos: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Nguyen Quang Huy',
    code: 1209312,
    email: 'hoang@gmail.com',
    isExist: true,
    infos: ['loser'],
  },
  {
    key: '3',
    name: 'Trinh Van Hoang',
    code: 1209312,
    email: 'trinh@gmail.com',
    isExist: false,
    infos: ['cool', 'teacher'],
  },
];

const ClassDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { setTitleHeader } = useAppContext();
  const [isShowAddedDrawer, setIsShowAddedDrawer] = useState(false);

  useEffect(() => {
    setTitleHeader('Django Cơ bản 2022');
    document.title = 'Django Cơ bản 2022';
  }, [setTitleHeader, params, dispatch]);

  return (
    <>
      <TableStudent
        dataStudent={data}
        setVisibleDrawer={setIsShowAddedDrawer}
      />
      <StudentAddedDrawer
        visible={isShowAddedDrawer}
        setVisible={setIsShowAddedDrawer}
      />
    </>
  );
};

export default ClassDetail;
