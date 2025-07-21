import { classNames } from '~/utils/classNames';
import { type ComponentPropsWithoutRef, forwardRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'button'> {}

export const PanelHeaderButton = forwardRef<HTMLButtonElement, Props>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={classNames(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors duration-200 text-bolt-elements-textSecondary hover:bg-bolt-elements-background-depth-3 hover:text-bolt-elements-textPrimary',
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

PanelHeaderButton.displayName = 'PanelHeaderButton';