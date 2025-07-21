import { classNames } from '~/utils/classNames';
import { memo, useCallback, useMemo, useState } from 'react';
import type { FileMap } from '~/lib/stores/files';

interface Props {
  files?: FileMap;
  selectedFile?: string;
  unsavedFiles?: Set<string>;
  rootFolder?: string;
  hideRoot?: boolean;
  onFileSelect?: (value?: string) => void;
  className?: string;
}

export const FileTree = memo(
  ({ files, selectedFile, unsavedFiles, rootFolder, hideRoot, onFileSelect, className = '' }: Props) => {
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

    const toggleFolder = useCallback((folderPath: string) => {
      setExpandedFolders((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(folderPath)) {
          newSet.delete(folderPath);
        } else {
          newSet.add(folderPath);
        }
        return newSet;
      });
    }, []);

    const sortedFiles = useMemo(() => {
      if (!files) {
        return [];
      }

      const fileEntries = Object.entries(files);

      // Separate folders and files
      const folders = fileEntries.filter(([, dirent]) => dirent?.type === 'folder');
      const regularFiles = fileEntries.filter(([, dirent]) => dirent?.type === 'file');

      // Sort folders alphabetically
      folders.sort(([pathA], [pathB]) => pathA.localeCompare(pathB));

      // Sort files alphabetically
      regularFiles.sort(([pathA], [pathB]) => pathA.localeCompare(pathB));

      return [...folders, ...regularFiles];
    }, [files]);

    const renderTree = (currentFiles: [string, { type: 'file' | 'folder'; content?: string } | undefined][]) => {
      const rootPath = rootFolder ? `${rootFolder}/` : '';
      const filteredFiles = currentFiles.filter(([filePath]) => filePath.startsWith(rootPath));

      const tree: Record<string, any> = {};

      filteredFiles.forEach(([filePath, dirent]) => {
        const relativePath = filePath.substring(rootPath.length);
        const segments = relativePath.split('/');
        let currentLevel = tree;

        segments.forEach((segment, index) => {
          if (!currentLevel[segment]) {
            currentLevel[segment] = {
              path: segments.slice(0, index + 1).join('/'),
              dirent: undefined,
              children: {},
            };
          }
          if (index === segments.length - 1) {
            currentLevel[segment].dirent = dirent;
          }
          currentLevel = currentLevel[segment].children;
        });
      });

      const renderNodes = (nodes: Record<string, any>, parentPath: string = '') => {
        return Object.entries(nodes)
          .sort(([nameA, nodeA], [nameB, nodeB]) => {
            const isFolderA = nodeA.dirent?.type === 'folder';
            const isFolderB = nodeB.dirent?.type === 'folder';

            if (isFolderA && !isFolderB) return -1;
            if (!isFolderA && isFolderB) return 1;
            return nameA.localeCompare(nameB);
          })
          .map(([name, node]) => {
            const fullPath = parentPath ? `${parentPath}/${name}` : name;
            const isFolder = node.dirent?.type === 'folder';
            const isExpanded = expandedFolders.has(fullPath);
            const isSelected = selectedFile === fullPath;
            const isUnsaved = unsavedFiles?.has(fullPath);

            return (
              <div key={fullPath} className="flex flex-col">
                <button
                  className={classNames(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-left transition-colors duration-200',
                    {
                      'bg-bolt-elements-background-depth-3': isSelected,
                      'hover:bg-bolt-elements-background-depth-3': !isSelected,
                      'text-bolt-elements-textPrimary': isSelected,
                      'text-bolt-elements-textSecondary': !isSelected,
                    },
                  )}
                  onClick={() => (isFolder ? toggleFolder(fullPath) : onFileSelect?.(fullPath))}
                >
                  {isFolder && (
                    <div
                      className={classNames('i-ph:caret-right-bold transition-transform duration-200', {
                        'rotate-90': isExpanded,
                      })}
                    />
                  )}
                  <div
                    className={classNames({
                      'i-ph:folder-simple-fill': isFolder,
                      'i-ph:file-fill': !isFolder,
                    })}
                  />
                  <span>{name}</span>
                  {isUnsaved && <div className="i-ph:dot-fill text-bolt-status-warning" />}
                </button>
                {isFolder && isExpanded && (
                  <div className="ml-4">{renderNodes(node.children, fullPath)}</div>
                )}
              </div>
            );
          });
      };

      return renderNodes(tree);
    };

    return (
      <div className={classNames('flex flex-col overflow-auto', className)}>
        {hideRoot ? renderTree(sortedFiles) : renderTree(sortedFiles)}
      </div>
    );
  },
);

FileTree.displayName = 'FileTree';