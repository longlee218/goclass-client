import { Excalidraw, exportToSvg } from '@excalidraw/excalidraw';
import React, { useState } from 'react';

import { Typography } from 'antd';
import { slideSocket } from '../../services/socket.service';
import { useCallback } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { useEffect } from 'react';

const Whiteboard = ({ slide }) => {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [initData, setInitData] = useState({
    appState: {
      viewBackgroundColor: '#f7f7f7',
      currentItemFontFamily: 3,
      isLoading: true,
    },
    collaborators: [],
  });

  useEffect(() => {
    slideSocket.on('connect', () => {
      slideSocket.emit('join', slide._id);
      slideSocket.on('updated', (data) => {
        setInitData((pre) => {
          return { ...pre, ...data };
        });
      });
    });

    slideSocket.on('disconnect', () => {});

    return () => {
      slideSocket.off('disconnect');
      slideSocket.off('connect');
    };
  }, []);

  useEffect(() => {
    console.log('running...');
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      setInitData({
        elements: slide?.elements ?? [],
        appState: slide?.appState ?? {
          viewBackgroundColor: '#f7f7f7',
          currentItemFontFamily: 3,
          isLoading: true,
        },
        files: slide?.files || [],
      });
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [slide._id]);

  const onSaveExcalidraw = useCallback(
    useDebounce(function (elements, appState, files) {
      exportToSvg({
        elements,
        appState: {
          ...initData.appState,
          width: 300,
          height: 100,
          exportPadding: 10,
          exportBackground: false,
        },
      }).then((svg) => {
        slideSocket.emit(
          'save',
          { elements, appState, files, thumbnail: svg.outerHTML },
          slide._id
        );
      });
    }, 3000),
    [slide._id]
  );

  return (
    <>
      {!isLoading ? (
        <Excalidraw
          name={slide.name}
          ref={(api) => setExcalidrawAPI(api)}
          onChange={onSaveExcalidraw}
          initialData={initData}
          langCode='vi-VN'
          autoFocus={true}
        />
      ) : (
        <Typography.Text>Đang tải...</Typography.Text>
      )}
    </>
  );
};

export default Whiteboard;
