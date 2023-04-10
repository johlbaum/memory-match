import { useState, useEffect } from "react";
import { cardList } from "../../data/cardList";
import Card from "./Card";
import "../../styles/cardList.css";

const CardList = () => {
  const duplicateCardList = cardList.concat(cardList);
  const [cardsSelection, setCardsSelection] = useState<string[]>([]);
  const [newArray, setNewArray] = useState(duplicateCardList.slice());

  useEffect(() => {
    if (cardsSelection.length === 2) {
      if (cardsSelection[0].includes(cardsSelection[1])) {
        const cardNameToDelete = newArray.find(
          (obj) => obj.title === cardsSelection[0]
        );
        if (cardNameToDelete) {
          const filteredArray = newArray.filter(
            (value) => value !== cardNameToDelete
          );
          setNewArray(filteredArray);
        }
        setCardsSelection([]);
      } else {
        setCardsSelection([]);
      }
    }
  }, [cardsSelection, newArray]);

  return (
    <div className="card-list">
      {newArray.map((card, index) => (
        <Card
          key={`${card.id}-${index}`}
          title={card.title}
          img={card.img}
          setCardsSelection={setCardsSelection}
        />
      ))}
    </div>
  );
};

export default CardList;
