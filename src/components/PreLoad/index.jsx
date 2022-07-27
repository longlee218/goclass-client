import './style.css';

import React from 'react';
import { Spin, } from 'antd';
import { useSelector } from 'react-redux';

const PreLoad = () => {
  const loading = useSelector((state) => state.loading);
  const { isShow } = loading;
  return (
    <>
      {isShow && (
        <div id='preload' className='app_Preload'>
          <Spin size='large' tip='Dữ liệu đang được tải...' />
        </div>
      )}
    </>
  );
};

export default PreLoad;
