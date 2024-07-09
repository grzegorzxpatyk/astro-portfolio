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

    function handleMouseMove(event: MouseEvent) {
        const { clientX, clientY } = event;
        mouse.x.set(clientX - size / 2);
        mouse.y.set(clientY - size / 2);
        const target = event.target as HTMLElement;
        if (target.parentElement?.parentElement?.id === 'hero-heading') {
            scale.set(5);
        } else {
            scale.set(1);
        }
    }

    const scale = useMotionValue(1);
    const smoothScale = useSpring(scale, { damping: 20, stiffness: 200 });

    function handleMouseDown(event: MouseEvent) {
        scale.set(3);
    }

    function handleMouseUp(event: MouseEvent) {
        scale.set(1);
    }

    function handleMouseEnter(event: MouseEvent) {
        scale.set(1);
    }

    function handleMouseLeave(event: MouseEvent) {
        scale.set(0);
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.document.body.addEventListener('mouseenter', handleMouseEnter);
        window.document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousemove', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseUp);
            window.document.body.removeEventListener(
                'mouseenter',
                handleMouseEnter
            );
            window.document.body.removeEventListener(
                'mouseleave',
                handleMouseLeave
            );
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
