import { createContext, useState } from "react";

interface ScoreContextValue {
  score: number[];
  setScore: (score: number[]) => void;
}

export const ScoreContext = createContext<ScoreContextValue>({
  score: [],
  setScore: () => {},
});

interface ScoreProviderProps {
  children: React.ReactNode;
}

export const ScoreProvider: React.FunctionComponent<ScoreProviderProps> = ({
  children,
}) => {
  const [score, setScore] = useState<number[]>([]);

  const contextValue: ScoreContextValue = {
    score,
    setScore,
  };

  return (
    <ScoreContext.Provider value={contextValue}>
      {children}
    </ScoreContext.Provider>
  );
};
