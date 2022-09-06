import 'moment/locale/vi';

import { DatePicker } from 'antd';
import React from 'react';
import locale from 'antd/lib/date-picker/locale/vi_VN';
import moment from 'moment';

const { RangePicker } = DatePicker;

const RangeDatePickerVN = ({ style, placeholder, name, value }) => {
  return (
    <RangePicker
      showTime={{ format: 'HH:mm' }}
      name={name}
      locale={locale}
      style={style}
      placeholder={placeholder}
      format='DD-MM-YYYY HH:mm'
      onChange={(value) => console.log(value)}
      onOk={(value) => console.log(value)}
    />
  );
};

export default RangeDatePickerVN;
