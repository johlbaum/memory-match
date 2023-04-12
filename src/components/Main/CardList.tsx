import { useState, useEffect } from "react";
import cardList from "../../data/cardList";
import Card from "./Card";
import "../../styles/cardList.css";

interface CardSelection {
  id: number;
  cardTitle: string;
}

const CardList = () => {
  const [cards, setCards] = useState(cardList());
  const [cardsSelection, setCardsSelection] = useState<CardSelection[]>([]);

  useEffect(() => {
    console.log(cardsSelection);
    if (cardsSelection.length > 0 && cardsSelection.length < 2) {
      if (
        cardsSelection[0]?.id === cardsSelection[1]?.id &&
        cardsSelection[0]?.cardTitle === cardsSelection[1]?.cardTitle
      ) {
        console.log("carte identiques");
      }
    }
  }, [cardsSelection]);

  return (
    <div className="card-list">
      {cards.map((card, index) => (
        <Card
          key={card.id}
          id={card.id}
          title={card.title}
          imgFront={card.imgFront}
          imgBack={card.imgBack}
          setCardsSelection={setCardsSelection}
        />
      ))}
    </div>
  );
};

export default CardList;
