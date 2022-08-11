import React from 'react';
import { Select } from 'antd';

const { Option } = Select;
const LiST_GRADES = [
  'Nhà trẻ',
  'Mẫu giáo',
  'Mầm non',
  'Khối 1',
  'Khối 2',
  'Khối 3',
  'Khối 4',
  'Khối 5',
  'Khối 6',
  'Khối 7',
  'Khối 8',
  'Khối 9',
  'Khối 10',
  'Khối 11',
  'Khối 12',
  'Cao đẳng',
  'Đại học',
];

const SelectListGrade = ({ name, placeholder, value, disabled }) => {
  return (
    <Select
      mode='multiple'
      placeholder={placeholder}
      name={name}
      disabled={disabled}
      value={value}
      allowClear
    >
      {LiST_GRADES.map((grade, i) => (
        <Option key={i} value={grade}>
          {grade}
        </Option>
      ))}
    </Select>
  );
};

export default SelectListGrade;
