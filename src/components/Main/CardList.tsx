import { useState, useEffect } from "react";
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
  dispatchSetData: React.Dispatch<{ type: "SET_DATA"; payload: Cards[] }>;
  dispatchSetTransitionDuration: React.Dispatch<{
    type: "RESET_TRANSITION_DURATION";
  }>;
  transitionDurationIsActive: boolean;
}

const CardList: React.FunctionComponent<CardListProps> = ({
  cardList,
  dispatchSetData,
  dispatchSetTransitionDuration,
  transitionDurationIsActive,
}) => {
  const [cardsSelection, setCardsSelection] = useState<CardSelection[]>([]);

  const onCardClick = (currentCard: Cards) => {
    const selectedListCard = cardList.map((current) => {
      if (currentCard.id === current.id && cardsSelection.length < 2) {
        return { ...currentCard, isSelected: true };
      }
      return current;
    });
    dispatchSetData({
      type: "SET_DATA",
      payload: selectedListCard,
    });
  };

  useEffect(() => {
    const [card1, card2] = cardsSelection;
    if (cardsSelection.length === 2 && card1.cardTitle === card2.cardTitle) {
      const foundListCard = cardList.map((curr) => {
        if (
          curr.title === cardsSelection[0].cardTitle &&
          curr.title === cardsSelection[1].cardTitle
        ) {
          return { ...curr, isFound: true };
        }
        return curr;
      });

      dispatchSetData({
        type: "SET_DATA",
        payload: foundListCard,
      });
    }

    if (
      cardsSelection.length === 2 &&
      cardsSelection[0].cardTitle === cardsSelection[1].cardTitle
    ) {
      setCardsSelection([]);
    }

    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      const resetSelectedCardList = cardList.map((curr) => {
        if (
          curr.isSelected === true &&
          curr.isFound !== true &&
          cardsSelection.length === 2
        ) {
          return { ...curr, isSelected: false };
        }
        return curr;
      });

      if (test.length) {
        dispatchSetData({
          type: "SET_DATA",
          payload: resetSelectedCardList,
        });
      }

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
          dispatchSetTransitionDuration={dispatchSetTransitionDuration}
          transitionDurationIsActive={transitionDurationIsActive}
          onCardClick={onCardClick}
          currentCard={card}
        />
      ))}
    </div>
  );
};

export default CardList;
