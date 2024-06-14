import { motion } from 'framer-motion';

export default function NavLinks({
    routes,
    pathname,
}: {
    routes: string[];
    pathname: string;
}) {
    return (
        <nav className='flex flex-row items-center justify-start gap-2 max-md:hidden md:gap-4'>
            {routes.map((element) => (
                <a key={element} href={`#${element}`} className='relative'>
                    {element}
                    {pathname === element && (
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
            <a
                href='https://grzegorzxpatyk.github.io/resume/'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex flex-row items-center justify-start gap-1'
            >
                resume
                <TopRightArrow />
            </a>
        </nav>
    );
}

function TopRightArrow() {
    return (
        <svg
            width='15'
            height='15'
            viewBox='0 0 15 15'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z'
                fill='currentColor'
                fillRule='evenodd'
                clipRule='evenodd'
            ></path>
        </svg>
    );
}
