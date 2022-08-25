import { Button, Card, Dropdown, Input, Menu, Typography } from 'antd';
import React, { useCallback, useState } from 'react';
import {
  faCopy,
  faEllipsisV,
  faReorder,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import assignActions from '../../../../redux/assign/assign.action';
import { teacherRouteConfig } from '../../../../config/route.config';
import useDebounce from '../../../../hooks/useDebounce';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const DropdownSlide = ({ dispatch, slide, openModal, setSlideCurrent }) => {
  const onDuplicateSlide = () => {
    dispatch(assignActions.duplicateSlide(slide._id));
  };
  const onSortTheSlides = () => {
    setSlideCurrent(slide);
    openModal();
  };

  return (
    <Menu
      items={[
        {
          key: 'share',
          label: (
            <div>
              <FontAwesomeIcon icon={faReorder} style={{ marginRight: 10 }} />
              <Typography.Text
                strong
                type='secondary'
                onClick={onSortTheSlides}
              >
                Sắp xếp
              </Typography.Text>
            </div>
          ),
        },
        {
          key: 'duplicate',
          label: (
            <div>
              <FontAwesomeIcon icon={faCopy} style={{ marginRight: 10 }} />
              &nbsp;
              <Typography.Text
                strong
                type='secondary'
                onClick={onDuplicateSlide}
              >
                Nhân đôi
              </Typography.Text>
            </div>
          ),
        },
        {
          key: 'delete',
          label: (
            <div>
              <FontAwesomeIcon
                icon={faTrash}
                color='red'
                style={{ marginRight: 10 }}
              />
              &nbsp;
              <Typography.Text strong type='danger'>
                Xóa
              </Typography.Text>
            </div>
          ),
        },
      ]}
    />
  );
};

const AssignSlide = ({ slide, openModal, setSlideCurrent }) => {
  const { _id, order, points, assignment } = slide;
  const [slidePoint, setSlidePoint] = useState(points);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickCard = (e) => {
    e.preventDefault();
    let link = teacherRouteConfig.slideWithParam.replace(
      ':assignId',
      assignment
    );
    link = link.replace(':slideId', _id);
    navigate(link);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeInputSlide = useCallback(
    useDebounce((e) => {
      dispatch(
        assignActions.updateSlide(_id, {
          [e.target.name]: e.target.value,
        })
      );
    }, 1000).bind(this),
    []
  );

  return (
    <Card
      key={_id}
      hoverable
      style={{
        display: 'inline-block',
        boxShadow: '0 0 8px 1px rgb(64 67 69 / 17%)',
        width: 'calc(225px + 1.6rem)',
      }}
      bodyStyle={{
        height: 'calc(125px + (0.8rem * 2))',
        padding: 0,
      }}
      actions={[
        <Typography.Text strong>{order}</Typography.Text>,
        <Input
          name='points'
          onChange={(e) => {
            setSlidePoint(e.target.value);
            onChangeInputSlide(e);
          }}
          size='small'
          value={slidePoint}
          suffix={<small>điểm</small>}
        />,
        <Dropdown
          placement='bottomLeft'
          arrow
          overlay={
            <DropdownSlide
              dispatch={dispatch}
              slide={slide}
              openModal={openModal}
              setSlideCurrent={setSlideCurrent}
            />
          }
          trigger={['click']}
        >
          <Button type='text' onClick={(e) => e.stopPropagation()}>
            <FontAwesomeIcon icon={faEllipsisV} />
          </Button>
        </Dropdown>,
      ]}
    >
      <div
        onClick={onClickCard}
        dangerouslySetInnerHTML={{
          __html: `
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 140" width="250" height="152">
              ${slide?.thumbnail}
            </svg>
        `,
        }}
      />
    </Card>
  );
};

export default AssignSlide;
