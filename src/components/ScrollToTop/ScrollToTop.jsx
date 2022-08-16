import { faArrowCircleUp, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const scrollBehavior = () => {
      const scrollY = window.scrollY;
      if (scrollY > 200) {
        setVisible(true);
      } else if (scrollY <= 200) {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', scrollBehavior);
    return () => window.removeEventListener('scroll', scrollBehavior);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      shape='circle'
      style={{
        display: visible ? 'inline' : 'none',
        position: 'fixed',
        bottom: 20,
        right: 20,
      }}
      size='large'
      type='primary'
      icon={<FontAwesomeIcon icon={faArrowUp} />}
    />
  );
};

export default ScrollToTop;
