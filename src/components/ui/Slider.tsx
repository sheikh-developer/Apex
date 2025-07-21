import { classNames } from '~/utils/classNames';
import { type ComponentPropsWithoutRef, forwardRef } from 'react';

export interface SliderOptions<T extends string> {
  left: {
    value: T;
    text: string;
  };
  right: {
    value: T;
    text: string;
  };
}

interface Props<T extends string> extends ComponentPropsWithoutRef<'div'> {
  selected: T;
  options: SliderOptions<T>;
  setSelected: (value: T) => void;
}

export const Slider = forwardRef<HTMLDivElement, Props<string>>(
  ({ selected, options, setSelected, className = '', ...props }, ref) => {
    const isLeftSelected = selected === options.left.value;

    return (
      <div
        ref={ref}
        className={classNames(
          'relative flex items-center rounded-full p-0.5 text-sm font-medium bg-bolt-elements-background-depth-3',
          className,
        )}
        {...props}
      >
        <button
          className={classNames(
            'relative z-10 px-3 py-1.5 rounded-full transition-colors duration-200',
            {
              'text-bolt-elements-textPrimary': isLeftSelected,
              'text-bolt-elements-textSecondary': !isLeftSelected,
            },
          )}
          onClick={() => setSelected(options.left.value)}
        >
          {options.left.text}
        </button>
        <button
          className={classNames(
            'relative z-10 px-3 py-1.5 rounded-full transition-colors duration-200',
            {
              'text-bolt-elements-textPrimary': !isLeftSelected,
              'text-bolt-elements-textSecondary': isLeftSelected,
            },
          )}
          onClick={() => setSelected(options.right.value)}
        >
          {options.right.text}
        </button>
        <div
          className={classNames(
            'absolute inset-y-0 w-1/2 rounded-full bg-bolt-elements-terminals-buttonBackground transition-transform duration-200',
            {
              'translate-x-full': !isLeftSelected,
            },
          )}
        />
      </div>
    );
  },
);

Slider.displayName = 'Slider';