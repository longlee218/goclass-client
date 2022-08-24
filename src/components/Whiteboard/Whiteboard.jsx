import React, { useState } from 'react';

import { Excalidraw } from '@excalidraw/excalidraw';
import slideService from '../../services/slide.service';
import { slideSocket } from '../../services/socket.service';
import { useCallback } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { useEffect } from 'react';

const Whiteboard = ({ id, name }) => {
  const [socketConnected, setSocketConnected] = useState(false);
  const [haschanged, setHaschanged] = useState(false);
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const [initData, setInitData] = useState({
    appState: {
      viewBackgroundColor: '#f7f7f7',
      currentItemFontFamily: 3,
    },
  });

  useEffect(() => {
    slideSocket.on('connect', () => {
      setSocketConnected(true);
      slideSocket.emit('join', id);
    });

    slideSocket.on('disconnect', () => {
      setSocketConnected(false);
    });

    slideSocket.on('updated', (data) => {
      setInitData((pre) => {
        return { ...pre, ...data };
      });
    });

    return () => {
      slideSocket.off('disconnect');
      slideSocket.off('connect');
    };
  }, []);

  useEffect(() => {
    slideService.findById(id).then(({ elements, appState, files }) => {
      setInitData({
        elements,
        appState,
        files,
      });
    });
  }, [id]);

  const onChangeExcalidraw = useCallback(
    useDebounce(function (elements, appState, files) {
      console.log('why you running');
      slideSocket.emit('edit', { elements, appState, files }, id);
    }, 2000),
    [id]
  );

  return (
    <Excalidraw
      name={name}
      ref={(api) => setExcalidrawAPI(api)}
      onChange={(elements, appState, files) => {
        setHaschanged(true);
        onChangeExcalidraw(elements, appState, files);
      }}
      initialData={initData}
      langCode='vi-VN'
      isCollaborating={false}
      onPointerDown={(activeTool, pointerDownState) =>
        console.log({ activeTool, pointerDownState })
      }
      onCollabButtonClick={() => window.alert('You clicked on collab button')}
    />
  );
};

export default Whiteboard;
