import { useEffect, useState } from 'react';
import {
  motion,
  type SpringOptions,
  useMotionValue,
  useSpring,
} from 'framer-motion';

export default function Cursor() {
  const size = 30;
  const [clicked, setClicked] = useState(false);
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const springConfig: SpringOptions = {
    damping: 20,
    stiffness: 300,
    mass: 0.5,
  };
  const smoothMouse = {
    x: useSpring(mouse.x, springConfig),
    y: useSpring(mouse.y, springConfig),
  };

  const manageMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    mouse.x.set(clientX - size / 2);
    mouse.y.set(clientY - size / 2);
  };

  useEffect(() => {
    window.addEventListener('mousemove', manageMouseMove);
    window.addEventListener('click', (event: MouseEvent) => {
      setClicked(true);
      setTimeout(() => setClicked(false), 300);
    });
    return () => {
      window.removeEventListener('mousemove', manageMouseMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <motion.div
        style={{
          left: smoothMouse.x,
          top: smoothMouse.y,
          height: size,
          width: size,
          backdropFilter: `invert(0.9) ${clicked ? 'blur(1.5px)' : 'blur(0)'}`,
          transition: 'backdrop-filter 100ms ease-in',
        }}
        className='pointer-events-none fixed rounded-full'
      ></motion.div>
    </div>
  );
}
