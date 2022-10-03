import { Excalidraw, exportToSvg } from '@excalidraw/excalidraw';
import React, { useRef, useState } from 'react';

import { Typography } from 'antd';
import { slideSocket } from '../../services/socket.service';
import { useCallback } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { useEffect } from 'react';

const resolvablePromise = () => {
  let resolve;
  let reject;
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  promise.resolve = resolve;
  promise.reject = reject;
  return promise;
};

const Whiteboard = ({ slide, user, libraryItems }) => {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSave, setIsSave] = useState(false);
  const [initData, setInitData] = useState({
    appState: {
      viewBackgroundColor: '#f7f7f7',
      currentItemFontFamily: 3,
      isLoading: true,
    },
    collaborators: [],
  });

  const initialLibraryStatePromiseRef = useRef({ promise: null });

  if (!initialLibraryStatePromiseRef.current.promise) {
    initialLibraryStatePromiseRef.current.promise = resolvablePromise();
  }

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
  }, [slide._id]);

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
        libraryItems: libraryItems || [],
      });
      setIsLoading(false);
    }, 300);
    return () => {
      clearTimeout(timeoutId);
      setIsSave(false);
    };
  }, [slide._id, slide?.elements, slide?.appState, slide?.files]);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsSave(true);
    }, 3000);
    return () => {
      clearTimeout(id);
    };
  }, [slide._id]);

  const onSaveExcalidraw = useCallback(
    useDebounce(function (elements, appState, files) {
      if (isSave) {
        console.log('save elements');
        exportToSvg({
          elements,
          appState: {
            ...initData.appState,
            // width: 300,
            // height: 100,
            // exportPadding: 10,
            exportBackground: true,
          },
        }).then((svg) => {
          svg.setAttribute('viewBox', '0 0 500 304');
          svg.setAttribute('width', '248');
          svg.setAttribute('height', '152');
          slideSocket.emit(
            'save',
            { elements, appState, files, thumbnail: svg.outerHTML },
            slide._id
          );
        });
      }
    }, 1000),
    [slide._id, isSave]
  );

  const onSaveLibrary = useCallback(
    (libElements, a) => {
      if (isSave) {
        // slideSocket.emit('save-lib', libElements, user._id);
      }
    },
    [user._id, isSave]
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
          isCollaborating={false}
          UIOptions={{ canvasActions: { loadScene: isLoading } }}
          onLibraryChange={onSaveLibrary}
          libraryReturnUrl={window.location.href}
        />
      ) : (
        <Typography.Text>Đang tải...</Typography.Text>
      )}
    </>
  );
};

export default Whiteboard;
