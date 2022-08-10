import './style.css';

import {
  Button,
  Dropdown,
  Input,
  Menu,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import {
  faEllipsisV,
  faFile,
  faFileLines,
  faFilePen,
  faFolder,
  faFolderPlus,
  faShare,
  faStore,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalAddFolder from '../../../components/Modal/ModalAddFolder';
import alertActions from '../../../redux/alert/alert.action';
import assignmentFolderService from '../../../services/assignmentFolder.service';
import moment from 'moment';
import { teacherRouteConfig } from '../../../config/route.config';
import { useAppContext } from '../../../hooks/useAppContext';
import { useDispatch } from 'react-redux';

const { Search } = Input;

const data = [
  {
    key: '1',
    name: 'Student Demo Assignment',
    createdAt: '11/06/2022 19:03:00',
    isFolder: true,
    status: 'offline',
  },
  {
    key: '1',
    name: 'Student Demo Assignment',
    createdAt: '11/06/2022 19:03:00',
    isFolder: false,
    status: 'online',
  },
  {
    key: '1',
    name: 'Student Demo Assignment',
    createdAt: '11/06/2022 19:03:00',
    isFolder: true,
    status: 'online',
  },
];

const AssignmentStore = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { setTitleHeader } = useAppContext();
  const [isOpenAddFolder, setIsOpenAddFolder] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTable, setIsLoadingTable] = useState(true);
  const inputFolder = useRef(null);
  const [nameFolder, setNameFolder] = useState('');
  const [dataTable, setDataTable] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const navigate = useNavigate();

  const addDropDowns = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <div className='menu-item-action'>
              <i>
                <FontAwesomeIcon icon={faFilePen} />
              </i>
              <Typography.Text strong type='secondary'>
                Tạo Bài tập trống
              </Typography.Text>
            </div>
          ),
        },
        {
          key: '2',
          label: (
            <div className='menu-item-action'>
              <i>
                <FontAwesomeIcon icon={faStore} />
              </i>
              <Typography.Text strong type='secondary'>
                Tạo Bài tập từ thư viện
              </Typography.Text>
            </div>
          ),
        },
      ]}
    />
  );

  const columns = [
    {
      key: 'name',
      title: 'Tên',
      dataIndex: 'name',
      width: '60%',
      render: (_, { _id, name, isFolder }) => {
        return (
          <span
            className='d-flex gap-15'
            style={{ cursor: 'pointer' }}
            onClick={() =>
              navigate(teacherRouteConfig.assignmentStores + '/' + _id)
            }
          >
            {isFolder ? (
              <FontAwesomeIcon
                icon={faFolder}
                style={{ color: 'var(--warning)' }}
                size='lg'
              />
            ) : (
              <FontAwesomeIcon
                icon={faFileLines}
                style={{ color: 'var(--danger)', fontSize: '20px' }}
              />
            )}

            <Typography.Text>{name}</Typography.Text>
          </span>
        );
      },
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_, { isFolder, status }) => {
        let color = '';
        let text = '';
        if (status === 'online' && isFolder) {
          text = '2 bài đang kiểm tra';
          color = 'blue';
        } else if (status === 'online' && !isFolder) {
          text = 'Đang kiểm tra';
          color = 'volcano';
        }
        return (
          <Tag color={color} key={text}>
            {text.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, { createdAt }) => {
        return (
          <Typography>
            {moment(createdAt).format('DD/MM/YYYY, HH:mm')}
          </Typography>
        );
      },
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button type='text'>
            <FontAwesomeIcon
              icon={faShare}
              style={{
                color: 'var(--secondary)',
              }}
            />
          </Button>
          <Button type='text'>
            <FontAwesomeIcon
              icon={faEllipsisV}
              style={{
                color: 'var(--secondary)',
              }}
            />
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    document.title = 'Kho lưu trữ bài tập';
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputFolder.current?.focus();
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    setTitleHeader('Kho lưu trữ bài tập');
  }, [setTitleHeader]);

  useEffect(() => {
    setIsLoadingTable(true);
    assignmentFolderService
      .getFolderAndAssignment(params.fatherId)
      .then((data) => {
        setDataTable(() => {
          const folders = data.folders.map((folder) => ({
            ...folder,
            isFolder: true,
          }));
          return [...folders, ...data.assignments];
        });
      })
      .catch((error) => dispatch(error.message))
      .finally(() => setIsLoadingTable(false));
  }, [params, dispatch, trigger]);

  const onOpenModalFolder = () => {
    setIsOpenAddFolder(true);
  };

  const onOkAddFolder = () => {
    if (!nameFolder) {
      dispatch(alertActions.error('Tên thư mục không được để trống.'));
    } else {
      dispatch(alertActions.loading());
      setIsLoading(true);
      assignmentFolderService
        .createFolder(nameFolder, params.fatherId)
        .then(() => {
          dispatch(alertActions.success());
          setIsOpenAddFolder(false);
          setTrigger(!trigger);
        })
        .catch((error) => dispatch(alertActions.error(error.message)))
        .finally(() => {
          setIsLoading(false);
          setNameFolder('');
        });
    }
  };

  const onCancelAddFolder = () => {
    setIsLoading(false);
    setIsOpenAddFolder(false);
    setNameFolder('');
  };

  return (
    <>
      <ModalAddFolder
        visible={isOpenAddFolder}
        onOk={onOkAddFolder}
        onCancel={onCancelAddFolder}
        isLoading={isLoading}
      >
        <Input
          autoFocus
          ref={inputFolder}
          name='folder_name'
          placeholder='VD. Thư mục Đề Tiếng Việt'
          style={{
            marginBottom: '10px',
          }}
          value={nameFolder}
          onChange={(e) => setNameFolder(e.target.value)}
        />
        <div>
          <Typography.Text italic>
            Thầy cô có thể chèn dấu "/" giữa các tên để tạo nhiều Thư mục 1 lúc
          </Typography.Text>
        </div>
      </ModalAddFolder>
      <div className='assignment_wrapper'>
        <div className='assignment_wrapper__actions'>
          <div className='assignment_wrapper__search'>
            <Search
              placeholder='Tìm kiếm'
              onSearch={() => {}}
              style={{ width: 300 }}
            />
          </div>
          <div className='assignment_wrapper__btngroup d-flex gap-15'>
            <Dropdown
              placement='bottom'
              arrow
              overlay={addDropDowns}
              trigger={['click']}
            >
              <Button
                shape='round'
                type='primary'
                danger
                className='wrapp-text-bold btn-warning'
              >
                Tạo đề
              </Button>
            </Dropdown>

            <Button className='wrapp-text-bold' onClick={onOpenModalFolder}>
              <FontAwesomeIcon
                icon={faFolderPlus}
                style={{ color: 'var(--warning)' }}
              />
              &nbsp; Tạo thư mục
            </Button>
          </div>
        </div>
        <div className='assignment_wrapper__table'>
          <Table
            columns={columns}
            pagination={false}
            dataSource={dataTable || []}
            loading={isLoadingTable}
            scroll={{
              x: 1300,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AssignmentStore;
