import { classNames } from '~/utils/classNames';
import { type ComponentPropsWithoutRef, forwardRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'div'> {}

export const PanelHeader = forwardRef<HTMLDivElement, Props>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames(
          'flex items-center px-3 py-2 border-b border-bolt-elements-borderColor text-sm font-medium text-bolt-elements-textSecondary shrink-0',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

PanelHeader.displayName = 'PanelHeader';