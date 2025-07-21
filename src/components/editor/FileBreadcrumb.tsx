import { classNames } from '~/utils/classNames';
import { Fragment, memo } from 'react';
import type { FileMap } from '~/lib/stores/files';

interface Props {
  pathSegments: string[];
  files?: FileMap;
  onFileSelect?: (value?: string) => void;
}

export const FileBreadcrumb = memo(({ pathSegments, files, onFileSelect }: Props) => {
  const currentPath = pathSegments.join('/');

  return (
    <div className="flex items-center gap-1.5">
      {pathSegments.map((segment, index) => {
        const isLast = index === pathSegments.length - 1;
        const path = pathSegments.slice(0, index + 1).join('/');
        const isFolder = files?.[path]?.type === 'folder';

        return (
          <Fragment key={path}>
            <button
              className={classNames('hover:underline', {
                'font-semibold text-bolt-elements-textPrimary': isLast,
                'text-bolt-elements-textSecondary': !isLast,
              })}
              onClick={() => onFileSelect?.(isFolder ? undefined : path)}
            >
              {segment}
            </button>
            {!isLast && <div className="i-ph:caret-right-bold text-bolt-elements-textSecondary" />}
          </Fragment>
        );
      })}
    </div>
  );
});

FileBreadcrumb.displayName = 'FileBreadcrumb';