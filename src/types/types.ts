import { Dispatch, SetStateAction } from "react";

export interface CardProps {
  title: string;
  img: string;
  setCardsSelection: Dispatch<SetStateAction<string[]>>;
}
