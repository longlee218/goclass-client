import './App.less';

import AppRoutes from './AppRoutes';
import PreLoad from './components/PreLoad';
import alertActions from './redux/alert/alert.action';
import { appSocket } from './services/socket.service';
import loadingActions from './redux/loading/loading.actions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    appSocket.on('connect', function () {
      console.log('Socket connected');
    });
  }, []);
  useEffect(() => {
    dispatch(alertActions.clear());
    dispatch(loadingActions.afterLoadingDOM());
  }, [dispatch]);

  return (
    <div className='app'>
      <PreLoad />
      <AppRoutes />
    </div>
  );
}

export default App;
