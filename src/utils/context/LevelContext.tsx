import { createContext, useState } from "react";

interface LevelContextValue {
  level: string;
  setLevel: (level: string) => void;
}

export const LevelContext = createContext<LevelContextValue | null>(null);

interface LevelProviderProps {
  children: React.ReactNode;
}

export const LevelProvider: React.FunctionComponent<LevelProviderProps> = ({
  children,
}) => {
  const [level, setLevel] = useState<string>("");

  const contextValue: LevelContextValue = {
    level,
    setLevel,
  };

  return (
    <LevelContext.Provider value={contextValue}>
      {children}
    </LevelContext.Provider>
  );
};
