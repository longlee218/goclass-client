import { Excalidraw, exportToSvg } from '@excalidraw/excalidraw';
import React, { useState } from 'react';

import { Typography } from 'antd';
import slideService from '../../services/slide.service';
import { slideSocket } from '../../services/socket.service';
import { useCallback } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { useEffect } from 'react';

const Whiteboard = ({ id, name }) => {
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
      slideSocket.emit('join', id);
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
    setIsLoading(true);
    slideService.findById(id).then(({ elements, appState, files }) => {
      console.log('running');
      setInitData({
        elements: elements ?? [],
        appState: appState ?? {
          viewBackgroundColor: '#f7f7f7',
          currentItemFontFamily: 3,
          isLoading: true,
        },
        files,
      });
      setIsLoading(false);
    });
  }, [id]);

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
        console.log(svg);
        slideSocket.emit(
          'save',
          { elements, appState, files, thumbnail: svg.outerHTML },
          id
        );
      });
    }, 3000),
    []
  );

  return (
    <>
      {!isLoading ? (
        <Excalidraw
          name={name}
          ref={(api) => setExcalidrawAPI(api)}
          onChange={onSaveExcalidraw}
          initialData={initData}
          langCode='vi-VN'
          isCollaborating={false}
          onCollabButtonClick={() =>
            window.alert('You clicked on collab button')
          }
        />
      ) : (
        <Typography.Text>Đang tải...</Typography.Text>
      )}
    </>
  );
};

export default Whiteboard;
