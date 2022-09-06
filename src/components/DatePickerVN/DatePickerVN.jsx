import 'moment/locale/vi';

import { DatePicker } from 'antd';
import React from 'react';
import locale from 'antd/lib/date-picker/locale/vi_VN';
import moment from 'moment';

const DatePickerVN = ({ style, placeholder, name, value, onChange }) => {
  return (
    <DatePicker
      name={name}
      locale={locale}
      style={style}
      placeholder={placeholder}
      format='DD-MM-YYYY'
      {...(value ? { value: moment(moment(value).toISOString()) } : {})}
      onChange={onChange}
    />
  );
};

export default DatePickerVN;
