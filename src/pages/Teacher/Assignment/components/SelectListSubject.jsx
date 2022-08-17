import React from 'react';
import { Select } from 'antd';

const { Option } = Select;
const LiST_SUBJECT = [
  'Ngữ văn',
  'Anh văn',
  'Ngoại ngữ',
  'Toán',
  'Hóa học',
  'Sinh học',
  'Tin học',
  'Vật lý',
  'Địa lý',
  'Lịch sử',
  'Giáo dục công dân',
  'Âm nhạc',
  'Mỹ thuật',
  'Kỹ năng sống',
  'Tập đọc',
  'Tập viết',
];

const SelectListSubject = ({
  name,
  placeholder,
  value,
  disabled,
  onChange,
}) => {
  return (
    <Select
      mode='multiple'
      placeholder={placeholder}
      name={name}
      disabled={disabled}
      value={value}
      onChange={onChange}
      allowClear
    >
      {LiST_SUBJECT.map((subject, i) => (
        <Option key={i} value={subject}>
          {subject}
        </Option>
      ))}
    </Select>
  );
};

export default SelectListSubject;
