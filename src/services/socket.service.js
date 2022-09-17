import { io } from 'socket.io-client';

const endpointBack = process.env.REACT_APP_BACKEND_URL;
const socketOptions = {
  path: '/socket',
};
export const appSocket = io(endpointBack, socketOptions);
export const slideSocket = io(endpointBack + '/slide', socketOptions);
export const notifySocket = io(endpointBack + '/notify', socketOptions);
