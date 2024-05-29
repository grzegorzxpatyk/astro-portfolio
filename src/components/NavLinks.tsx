import { motion } from 'framer-motion';

export default function NavLinks({
  routes,
  pathname,
}: {
  routes: string[];
  pathname: string;
}) {
  return (
    <>
      {routes.map((element) => (
        <a key={element} href={`/${element}`} className='relative'>
          {element === '' ? 'home' : element}
          {pathname === `/${element}` && (
            <motion.span
              layoutId='navlink-underline'
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 15,
              }}
              className='absolute left-0 top-full block h-[2px] w-full bg-zinc-800 dark:bg-zinc-500'
            />
          )}
        </a>
      ))}
    </>
  );
}
