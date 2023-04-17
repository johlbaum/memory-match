import { useState, useEffect, useContext } from "react";
import { LevelContext } from "../../utils/context/LevelContext";
import cardList from "../../data/cardList";
import Card from "./Card";
import "../../styles/cardList.css";
interface CardSelection {
  id: number;
  cardTitle: string;
}
interface Cards {
  id: number;
  title: string;
  imgFront: string;
  imgBack: string;
  isFound: boolean;
}

const CardList = () => {
  const { level } = useContext(LevelContext);
  const [cards, setCards] = useState(cardList(level));
  const [cardsSelection, setCardsSelection] = useState<CardSelection[]>([]);

  useEffect(() => {
    const [card1, card2] = cardsSelection;
    if (cardsSelection.length === 2 && card1.cardTitle === card2.cardTitle) {
      setCards((prev: Cards[]) => {
        return prev.map((curr) => {
          if (
            curr.title === cardsSelection[0].cardTitle &&
            curr.title === cardsSelection[1].cardTitle
          ) {
            return { ...curr, isFound: true };
          }
          return curr;
        });
      });

      setCardsSelection([]);
    }
  }, [cardsSelection]);

  useEffect(() => {
    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      if (cardsSelection.length === 2) {
        setCardsSelection([]);
      }
    }, 2500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [cardsSelection]);

  console.log(cardsSelection);

  return (
    <div className="card-list">
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          cardTitle={card.title}
          imgFront={card.imgFront}
          imgBack={card.imgBack}
          setCardsSelection={setCardsSelection}
          cardsSelection={cardsSelection}
          isFound={card.isFound}
        />
      ))}
    </div>
  );
};

export default CardList;
