import clsx from 'clsx';
import {
    Button as ReactAriaButton,
    type ButtonProps,
} from 'react-aria-components';
import { RippleContainer } from './Ripples';

export default function Button({
    className,
    children,
    hasRipples = true,
    ...props
}: ButtonProps & { hasRipples?: boolean }) {
    return (
        <ReactAriaButton
            className={clsx(
                'relative w-fit overflow-hidden rounded border border-zinc-400 bg-zinc-50 px-4 py-2 text-base font-medium text-zinc-900 shadow-lg shadow-zinc-600/20 transition-all data-[hovered]:bg-zinc-200 data-[hovered]:shadow-none data-[pressed]:shadow-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:data-[hovered]:bg-zinc-800',
                !hasRipples &&
                    'data-[pressed]:bg-zinc-300 dark:data-[pressed]:bg-zinc-700',
                className
            )}
            {...props}
        >
            <>{children}</>
            {hasRipples && <RippleContainer duration={1000} />}
        </ReactAriaButton>
    );
}
