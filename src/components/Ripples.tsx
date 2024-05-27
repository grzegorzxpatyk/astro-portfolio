import { motion } from 'framer-motion';
import { type MouseEvent, useEffect, useState } from 'react';

export function Ripple({
  coords,
  duration,
}: {
  coords: { x: number; y: number; size: number };
  duration: number;
}) {
  return (
    <motion.span
      className='absolute rounded-full bg-yellow-400/50 content-[_]'
      style={{
        left: coords.x,
        top: coords.y,
        width: coords.size,
        height: coords.size,
      }}
      initial={{ scale: 0, opacity: 1 }}
      animate={{
        scale: 2,
        opacity: 0,
        transition: {
          duration: duration / 1000,
          ease: 'easeInOut',
        },
      }}
    ></motion.span>
  );
}

export function RippleContainer({ duration }: { duration: number }) {
  const [rippleArray, setRippleArray] = useState<
    { x: number; y: number; size: number }[]
  >([]);

  useDebouncedRippleCleanUp(rippleArray.length, duration, () => {
    setRippleArray([]);
  });

  function addRipple(event: MouseEvent<HTMLDivElement>) {
    const { width, height, left, top } =
      event.currentTarget.getBoundingClientRect();
    const size = width > height ? width : height;
    const x = event.pageX - left - size / 2;
    const y = event.pageY - top - size / 2;
    const newRipple = {
      x,
      y,
      size,
    };

    setRippleArray([...rippleArray, newRipple]);
  }

  return (
    <div
      className='absolute bottom-0 left-0 right-0 top-0 h-full w-full'
      onClick={addRipple}
    >
      {rippleArray.length > 0 &&
        rippleArray.map((ripple, index) => (
          <Ripple key={`span-${index}`} coords={ripple} duration={duration} />
        ))}
    </div>
  );
}

const useDebouncedRippleCleanUp = (
  rippleCount: number,
  duration: number,
  cleanUpFunction: () => void
) => {
  useEffect(() => {
    let bounce: ReturnType<typeof setTimeout> | null = null;
    if (rippleCount > 0) {
      clearTimeout(bounce!);

      bounce = setTimeout(() => {
        cleanUpFunction();
        clearTimeout(bounce!);
      }, duration * 4);
    }

    return () => clearTimeout(bounce!);
  }, [rippleCount, duration, cleanUpFunction]);
};
