import './style.css';

import { Form, Input, Radio, Tooltip, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import {
  faFolderPlus,
  faGrip,
  faList,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

import AddButton from './components/AddButton';
import AppLocalStorage from '../../../utils/AppLocalStorage';
import Appbreadcrumb from '../../../components/Appbreadcrumb/Appbreadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GridFolder from './components/GridFolder';
import ModalAddFolder from '../../../components/Modal/ModalAddFolder';
import TableFolder from './components/TableFolder';
import alertActions from '../../../redux/alert/alert.action';
import assignFolderActions from '../../../redux/assign_folder/assign_folder.action';
import { assignFolderSelector } from '../../../redux/assign_folder/assign_folder.selector';
import assignmentFolderService from '../../../services/assignmentFolder.service';
import classGroupActions from '../../../redux/class_group/class_group.action';
import classRoomActions from '../../../redux/class_room/class_room.action';
import { removeVietnameseTones } from '../../../helpers/string.helper';
import studentActions from '../../../redux/student/student.action';
import { teacherRouteConfig } from '../../../config/route.config';
import { useAppContext } from '../../../hooks/useAppContext';
import { useCallback } from 'react';
import { useParams } from 'react-router';

const { Search } = Input;

const MODE_TABLE = 'table';
const MODE_GRID = 'grid';
const STORAGE_KEY = 'assign_store';

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
  const [dataTableClone, setDataTableClone] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [breadcrumps, setBreadcrumps] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [viewMode, setViewMode] = useState(MODE_TABLE);

  const currentAssignFolder = useSelector(assignFolderSelector);

  const fetchAssignAndFolder = useCallback(() => {
    assignmentFolderService
      .getFolderAndAssignment(params.fatherId)
      .then((data) => {
        const folders = data.folders.map((folder) => ({
          ...folder,
          isFolder: true,
        }));
        const assignments = data.assignments.map((assign) => ({
          ...assign,
          isFolder: false,
        }));
        const dataTable = [...folders, ...assignments];
        setDataTable(dataTable);
        setDataTableClone(dataTable);
      })
      .catch((error) => dispatch(error.message))
      .finally(() => setIsLoadingTable(false));
  }, [dispatch, params.fatherId]);

  useEffect(() => {
    document.title = 'Kho lưu trữ bài tập';
    const modeStore = AppLocalStorage(STORAGE_KEY);
    if (Object.keys(modeStore.myStore()).length === 0) {
      modeStore.set('view_mode', viewMode);
    }
    const mode = modeStore.get('view_mode');
    setViewMode(mode);
  }, [viewMode]);

  useEffect(() => {
    dispatch(studentActions.reset());
    dispatch(classRoomActions.reset());
    dispatch(classGroupActions.reset());
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputFolder.current?.focus();
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    setNameFolder(currentAssignFolder.name);
  }, [currentAssignFolder]);

  useEffect(() => {
    assignmentFolderService.getBreadcrumbs(params.fatherId).then((data) => {
      setBreadcrumps(() => {
        return [
          {
            name: 'All',
            link: teacherRouteConfig.assignmentStores,
          },
          ...data.map(({ name, _id }) => ({
            name: name,
            link: teacherRouteConfig.assignmentStoresWithParam.replace(
              ':fatherId',
              _id
            ),
          })),
        ];
      });
    });
    return () =>
      setBreadcrumps([
        { name: 'All', link: teacherRouteConfig.assignmentStores },
      ]);
  }, [params]);

  useEffect(() => {
    setTitleHeader('Kho lưu trữ bài tập');
  }, [setTitleHeader]);

  useEffect(() => {
    setIsLoadingTable(true);
    fetchAssignAndFolder();
    return () => setSearchText('');
  }, [fetchAssignAndFolder, trigger]);

  const onOpenModalFolder = () => {
    setIsOpenAddFolder(true);
  };

  const onSearch = (e) => {
    const filterVN = e.target.value.toLowerCase();
    setSearchText(e.target.value);
    setDataTableClone(() => {
      return dataTable.filter(({ name }) => {
        const nameVN = removeVietnameseTones(name).toLowerCase();
        return nameVN.includes(filterVN);
      });
    });
  };

  const onOkModalFolder = () => {
    if (!nameFolder) {
      dispatch(alertActions.error('Tên thư mục không được để trống.'));
    } else {
      submitChangeFolder();
    }
  };

  const triggerFetch = useCallback(() => setTrigger((prev) => !prev), []);

  const submitChangeFolder = useCallback(() => {
    dispatch(alertActions.loading());
    setIsLoading(true);
    const promiseService = currentAssignFolder._id
      ? assignmentFolderService.editFolder(currentAssignFolder._id, nameFolder)
      : assignmentFolderService.createFolder(nameFolder, params.fatherId);
    promiseService
      .then(() => {
        dispatch(alertActions.success());
        setIsOpenAddFolder(false);
        triggerFetch();
        setNameFolder('');
        dispatch(assignFolderActions.reset());
      })
      .catch((error) => dispatch(alertActions.error(error.message)))
      .finally(() => setIsLoading(false));
  }, [
    currentAssignFolder._id,
    dispatch,
    nameFolder,
    params.fatherId,
    triggerFetch,
  ]);

  const onCancelModalFolder = () => {
    setIsLoading(false);
    setIsOpenAddFolder(false);
    dispatch(assignFolderActions.reset());
    setNameFolder('');
  };

  const onChangeViewMode = (e) => {
    const modeValue = e.target.value;
    const modeStore = AppLocalStorage(STORAGE_KEY);
    modeStore.set('view_mode', modeValue);
    setViewMode(modeValue);
  };

  return (
    <>
      <ModalAddFolder
        title={currentAssignFolder._id ? 'Sửa thư mục' : 'Tạo thư mục'}
        visible={isOpenAddFolder}
        onOk={onOkModalFolder}
        onCancel={onCancelModalFolder}
        isLoading={isLoading}
      >
        <Form.Item
          {...(currentAssignFolder._id
            ? ''
            : {
                help: 'Thầy cô có thể chèn dấu `,` giữa các tên để tạo nhiều Thư mục 1 lúc',
              })}
        >
          <Input
            autoFocus
            ref={inputFolder}
            name='folder_name'
            placeholder='VD. Thư mục Bài tập Tiếng Việt'
            style={{
              marginBottom: '10px',
            }}
            value={nameFolder}
            onChange={(e) => setNameFolder(e.target.value)}
          />
        </Form.Item>
        {/* <div>
          <Typography.Text italic>
            Thầy cô có thể chèn dấu "," giữa các tên để tạo nhiều Thư mục 1 lúc
          </Typography.Text>
        </div> */}
      </ModalAddFolder>
      <div className='assignment_wrapper'>
        {/* <Appbreadcrumb breadcrumps={breadcrumps} /> */}
        <div className='assignment_wrapper__actions'>
          <div className='flex-1'>
            <Appbreadcrumb breadcrumps={breadcrumps} />
          </div>
          <div className='assignment_wrapper__search flex-1'>
            <Search
              placeholder='Tìm kiếm'
              value={searchText}
              onChange={onSearch}
            />
          </div>
          <div className='assignment_wrapper__btngroup d-flex gap-15 justify-flex-end flex-1'>
            <AddButton />
            <Tooltip title='Thêm thư mục'>
              <FontAwesomeIcon
                icon={faFolderPlus}
                style={{ color: 'var(--warning)' }}
                size='lg'
                onClick={onOpenModalFolder}
              />
            </Tooltip>
            <Radio.Group value={viewMode} onChange={onChangeViewMode}>
              <Radio.Button value={MODE_TABLE}>
                <FontAwesomeIcon icon={faList} />
              </Radio.Button>
              <Radio.Button value={MODE_GRID} type='primary'>
                <FontAwesomeIcon icon={faGrip} />
              </Radio.Button>
            </Radio.Group>
          </div>
        </div>
        {viewMode === MODE_TABLE && (
          <div className='assignment_wrapper__table'>
            <TableFolder
              dataTable={dataTableClone}
              isLoading={isLoadingTable}
              onOpenModalFolder={onOpenModalFolder}
              fetchDataTable={triggerFetch}
            />
          </div>
        )}
        {viewMode === MODE_GRID && (
          <div className='assigment_wrapper__grid'>
            <GridFolder
              dataGrid={dataTableClone}
              onOpenModalFolder={onOpenModalFolder}
              fetchDataGrid={triggerFetch}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default AssignmentStore;
