import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';

const Appbreadcrumb = ({ breadcrumps }) => {
  return (
    <div className='d-flex flex-1' style={{ marginBottom: '12px' }}>
      <Breadcrumb>
        {breadcrumps.map((breadcrump, i) => (
          <Breadcrumb.Item key={i}>
            <Link to={breadcrump.link}>{breadcrump.name}</Link>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default Appbreadcrumb;
