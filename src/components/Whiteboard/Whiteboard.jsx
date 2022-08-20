import React, { useState } from 'react';

import AppLocalStorage from '../../utils/AppLocalStorage';
import { Excalidraw } from '@excalidraw/excalidraw';
import { useEffect } from 'react';

const Whiteboard = ({ id, name }) => {
  const localStore = AppLocalStorage('slide-' + id);
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const [initData, setInitData] = useState({
    appState: {
      viewBackgroundColor: '#f7f7f7',
      currentItemFontFamily: 3,
    },
  });

  useEffect(() => {
    localStore.set('name', name);
  }, [name, localStore]);

  useEffect(() => {
    const dataInLocal = localStore.myStore();
    if (Object.keys(dataInLocal).length !== 0) {
      setInitData((prev) => ({
        ...prev,
        elements: dataInLocal['elements'],
        appState: {
          ...prev.appState,
          ...dataInLocal['app_state'],
          collaborators: [],
        },
        files: dataInLocal['files'],
      }));
    }
  }, []);

  const onChangeExcalidraw = (elements, state, files) => {
    localStore.set('elements', elements);
    localStore.set('app_state', state);
    localStore.set('files', files);
  };

  return (
    <Excalidraw
      name={name}
      ref={(api) => setExcalidrawAPI(api)}
      onChange={onChangeExcalidraw}
      initialData={initData}
      langCode='vi-VN'
      isCollaborating={false}
      //   onPointerUpdate={(payload) => console.log(payload)}
      onPointerDown={(activeTool, pointerDownState) =>
        console.log({ activeTool, pointerDownState })
      }
      onCollabButtonClick={() => window.alert('You clicked on collab button')}
    />
  );
};

export default Whiteboard;
