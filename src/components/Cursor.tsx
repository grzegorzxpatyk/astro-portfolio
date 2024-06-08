import { useEffect } from 'react';
import {
    motion,
    type SpringOptions,
    useMotionValue,
    useSpring,
} from 'framer-motion';

export default function Cursor() {
    const size = 30;
    const mouse = {
        x: useMotionValue(-size),
        y: useMotionValue(-size),
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

    function handleMouseMove(e: MouseEvent) {
        const { clientX, clientY } = e;
        mouse.x.set(clientX - size / 2);
        mouse.y.set(clientY - size / 2);
    }

    const scale = useMotionValue(1);
    const smoothScale = useSpring(scale, springConfig);

    function handleMouseDown(event: MouseEvent) {
        scale.set(3);
    }

    function handleMouseUp(event: MouseEvent) {
        scale.set(1);
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousemove', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseUp);
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
                    backdropFilter: 'invert(0.9) blur(0.3px)',
                    transformOrigin: 'center',
                    scale: smoothScale,
                }}
                className='pointer-events-none fixed rounded-full'
            ></motion.div>
        </div>
    );
}
