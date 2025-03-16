import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getLocaleStorageRecords, TimeRecord } from "../utils/LocalStorage";

interface TimeRecordContextType {
  records: TimeRecord[] | [];
  setRecords: (records: TimeRecord[] | []) => void;
}

const TimeRecordContext = createContext<TimeRecordContextType | undefined>(
  undefined
);

interface TimeRecordProviderProps {
  children: ReactNode;
}

export const TimeRecordProvider: React.FC<TimeRecordProviderProps> = ({
  children,
}) => {
  const [records, setRecords] = useState(getLocaleStorageRecords());

  useEffect(() => {
    const syncRecords = () => {
      setRecords(getLocaleStorageRecords());
    };

    window.addEventListener("storage", syncRecords);

    return () => {
      window.removeEventListener("storage", syncRecords);
    };
  }, []);

  return (
    <TimeRecordContext.Provider value={{ records, setRecords }}>
      {children}
    </TimeRecordContext.Provider>
  );
};

// Custom hook pro snadnější používání kontextu
export const useTimeRecordContext = (): TimeRecordContextType => {
  const context = useContext(TimeRecordContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
