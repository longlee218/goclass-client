import 'moment/locale/vi';

import { DatePicker } from 'antd';
import React from 'react';
import locale from 'antd/lib/date-picker/locale/vi_VN';

const DatePickerVN = ({ style, placeholder, name }) => {
  return (
    <DatePicker
      name={name}
      locale={locale}
      style={style}
      placeholder={placeholder}
      format='DD-MM-YYYYY'
    />
  );
};

export default DatePickerVN;
