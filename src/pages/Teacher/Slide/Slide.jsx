import './style.css';

import { Excalidraw } from '@excalidraw/excalidraw';
import React from 'react';

const Slide = () => {
  return (
    <div
      className='excalidraw-wrapper'
      style={{ height: 'calc(100vh - 60px)' }}
    >
      <Excalidraw
        onChange={(elements, state) =>
          console.log('Elements :', elements, 'State : ', state)
        }
        initialData={{
          appState: {
            viewBackgroundColor: '#f7f7f7',
            currentItemFontFamily: 3,
          },
          scrollToContent: true,
        }}
        langCode='vi-VN'
        // gridModeEnabled
        s
        onPointerUpdate={(payload) => console.log(payload)}
        onCollabButtonClick={() => window.alert('You clicked on collab button')}
      />
    </div>
  );
};

export default Slide;
