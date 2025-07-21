'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface DataStreamContextType {
  dataStream: any[]; // Replace 'any' with a more specific type if known
  setDataStream: React.Dispatch<React.SetStateAction<any[]>>;
}

const DataStreamContext = createContext<DataStreamContextType | undefined>(undefined);

export function DataStreamProvider({ children }: { children: ReactNode }) {
  const [dataStream, setDataStream] = useState<any[]>([]);

  return (
    <DataStreamContext.Provider value={{ dataStream, setDataStream }}>
      {children}
    </DataStreamContext.Provider>
  );
}

export function useDataStream() {
  const context = useContext(DataStreamContext);
  if (context === undefined) {
    throw new Error('useDataStream must be used within a DataStreamProvider');
  }
  return context;
}