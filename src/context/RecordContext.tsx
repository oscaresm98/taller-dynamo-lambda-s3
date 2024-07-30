import React, { createContext, useState, useCallback } from 'react';
import { getUserRecords } from '../services/aws-services';
import { UserData } from '../types';



type RecordsContextProps = {
  records: UserData[];
  isLoadingRecords: boolean;
  errorRecords: string | null;
  refreshRecords: () => Promise<void>;
}

type RecordProviderProps = {
  children: React.ReactNode
}

export const RecordsContext = createContext<RecordsContextProps | undefined>(undefined);

export const RecordsProvider = ({ children }: RecordProviderProps) => {
  const [records, setRecords] = useState<UserData[]>([]);
  const [isLoadingRecords, setIsLoadingRecords] = useState(false);
  const [errorRecords, setErrorRecords] = useState<string | null>(null);

  const refreshRecords = useCallback(async () => {
    setIsLoadingRecords(true);
    setErrorRecords(null);
    try {
      const {Items: data} = await getUserRecords();
      setRecords(data);
    } catch (err) {
      setErrorRecords('Error al cargar los registros. Por favor, intenta de nuevo.');
    } finally {
      setIsLoadingRecords(false);
    }
  }, []);

  return (
    <RecordsContext.Provider value={{ records, isLoadingRecords, errorRecords, refreshRecords }}>
      {children}
    </RecordsContext.Provider>
  );
};