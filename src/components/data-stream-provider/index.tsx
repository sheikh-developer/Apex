import { createContext, useContext, ReactNode } from 'react';

interface DataStreamContextType {
  dataStream: Array<{ type: string; data: string }>;
}

const DataStreamContext = createContext<DataStreamContextType | undefined>(undefined);

export function useDataStream() {
  const context = useContext(DataStreamContext);
  if (!context) {
    throw new Error('useDataStream must be used within a DataStreamProvider');
  }
  return context;
}

interface DataStreamProviderProps {
  children: ReactNode;
  value: Array<{ type: string; data: string }>;
}

export function DataStreamProvider({ children, value }: DataStreamProviderProps) {
  return (
    <DataStreamContext.Provider value={{ dataStream: value }}>
      {children}
    </DataStreamContext.Provider>
  );
}
