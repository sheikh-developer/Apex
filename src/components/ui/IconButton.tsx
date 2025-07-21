import { classNames } from '~/utils/classNames';
import { type ComponentPropsWithoutRef, forwardRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'button'> {
  icon: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const IconButton = forwardRef<HTMLButtonElement, Props>(
  ({ icon, size = 'md', className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={classNames(
          'flex items-center justify-center rounded-full transition-colors duration-200',
          {
            'w-6 h-6 text-base': size === 'sm',
            'w-7 h-7 text-lg': size === 'md',
            'w-8 h-8 text-xl': size === 'lg',
            'w-9 h-9 text-2xl': size === 'xl',
          },
          className,
        )}
        {...props}
      >
        <div className={icon} />
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';