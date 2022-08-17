import './style.css';

import { Excalidraw } from '@excalidraw/excalidraw';
import React from 'react';

const Slide = () => {
  return (
    <div className='excalidraw-wrapper' style={{ height: '100vh' }}>
      <Excalidraw
        onChange={(elements, state) =>
          console.log('Elements :', elements, 'State : ', state)
        }
        onPointerUpdate={(payload) => console.log(payload)}
        onCollabButtonClick={() => window.alert('You clicked on collab button')}
      />
    </div>
  );
};

export default Slide;
