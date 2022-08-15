import React from 'react';
import { Select } from 'antd';

const { Option } = Select;
const LIST_ACCESSES = [
  { k: 'private', v: 'Riêng tư - Chỉ học sinh mới truy cập' },
  { k: 'shared', v: 'Chia sẻ - Chia sẻ lên Thư viện bài tập' },
];

const SelectedAccess = ({ name, placeholder, value, disabled }) => {
  return (
    <Select
      placeholder={placeholder}
      name={name}
      disabled={disabled}
      value={value}
    >
      {LIST_ACCESSES.map(({ k, v }, i) => (
        <Option key={i} value={k}>
          {v}
        </Option>
      ))}
    </Select>
  );
};

export default SelectedAccess;
