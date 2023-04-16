import { useState, useEffect, useContext } from "react";
import { LevelContext } from "../../utils/context/LevelContext";
import cardList from "../../data/cardList";
import Card from "./Card";
import "../../styles/cardList.css";

interface CardSelection {
  id: number;
  cardTitle: string;
}

const CardList = () => {
  const { level } = useContext(LevelContext);
  const [cards, setCards] = useState(cardList(level));
  const [cardsSelection, setCardsSelection] = useState<CardSelection[]>([]);

  useEffect(() => {
    const [card1, card2] = cardsSelection;
    if (cardsSelection.length === 2 && card1.cardTitle === card2.cardTitle) {
      const timeoutId: NodeJS.Timeout = setTimeout(() => {
        setCards((prevCards) => {
          const arrayWithoutDuplicates = prevCards.filter((curr) => {
            return curr.id !== card1.id && curr.id !== card2.id;
          });
          return arrayWithoutDuplicates;
        });
        setCardsSelection([]);
      }, 2000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
    if (cardsSelection.length === 2) {
      const timeoutId: NodeJS.Timeout = setTimeout(() => {
        setCardsSelection([]);
      }, 2500);
      return () => {
        clearTimeout(timeoutId);
      };
    }
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
        />
      ))}
    </div>
  );
};

export default CardList;
