import { useState, useEffect, Dispatch, SetStateAction } from "react";
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
  isSelected: boolean;
}

interface CardListProps {
  cardList: Cards[];
  setCardList: Dispatch<SetStateAction<Cards[]>>;
  setFirstClickOnCard: Dispatch<SetStateAction<boolean>>;
  setTransitionDurationIsActive: Dispatch<SetStateAction<boolean>>;
  transitionDurationIsActive: boolean;
}

const CardList: React.FunctionComponent<CardListProps> = ({
  cardList,
  setCardList,
  setFirstClickOnCard,
  transitionDurationIsActive,
  setTransitionDurationIsActive,
}) => {
  const [cardsSelection, setCardsSelection] = useState<CardSelection[]>([]);

  const onCardClick = (currentCard: Cards) => {
    const selectedListCard = cardList.map((current) => {
      if (currentCard.id === current.id && cardsSelection.length < 2) {
        return { ...currentCard, isSelected: true };
      }
      return current;
    });
    setCardList(selectedListCard);
  };

  useEffect(() => {
    const [card1, card2] = cardsSelection;
    if (cardsSelection.length === 2 && card1.cardTitle === card2.cardTitle) {
      setCardList((prev: Cards[]) => {
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
    }

    if (
      cardsSelection.length === 2 &&
      cardsSelection[0].cardTitle === cardsSelection[1].cardTitle
    ) {
      setCardsSelection([]);
    }

    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      setCardList((prev: Cards[]) => {
        return prev.map((curr) => {
          if (
            curr.isSelected === true &&
            curr.isFound !== true &&
            cardsSelection.length === 2
          ) {
            return { ...curr, isSelected: false };
          }
          return curr;
        });
      });
      //Bloque la selection pendant 1 seconde si la paire ne match pas
      if (
        cardsSelection.length === 2 &&
        cardsSelection[0].cardTitle !== cardsSelection[1].cardTitle
      ) {
        setCardsSelection([]);
      }
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [cardsSelection]);

  return (
    <div className="card-list">
      {cardList.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          cardTitle={card.title}
          imgFront={card.imgFront}
          imgBack={card.imgBack}
          setCardsSelection={setCardsSelection}
          cardsSelection={cardsSelection}
          isFound={card.isFound}
          isSelected={card.isSelected}
          setFirstClickOnCard={setFirstClickOnCard}
          transitionDurationIsActive={transitionDurationIsActive}
          setTransitionDurationIsActive={setTransitionDurationIsActive}
          onCardClick={onCardClick}
          currentCard={card}
        />
      ))}
    </div>
  );
};

export default CardList;
