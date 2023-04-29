import { useState, useEffect, useContext } from "react";
import { ScoreContext } from "../../utils/context/ScoreContext";
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
  dispatchSetFirstClickOnCard: React.Dispatch<{
    type: "RESET_FIRST_CLICK_ON_CARD";
  }>;
  transitionDurationIsActive: boolean;
}

const CardList: React.FunctionComponent<CardListProps> = ({
  cardList,
  dispatchSetData,
  dispatchSetTransitionDuration,
  transitionDurationIsActive,
  dispatchSetFirstClickOnCard,
}) => {
  const [cardsSelection, setCardsSelection] = useState<CardSelection[]>([]);
  const { setScore, score } = useContext(ScoreContext);

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

    //Score update
    if (cardsSelection.length === 2 && card1.cardTitle === card2.cardTitle) {
      setScore([...score, 60]);
    }
    if (cardsSelection.length === 2 && card1.cardTitle !== card2.cardTitle) {
      setScore([...score, -30]);
    }

    //Detect the match in the selection
    if (cardsSelection.length === 2 && card1.cardTitle === card2.cardTitle) {
      const foundListCard = cardList.map((curr) => {
        if (curr.title === card1.cardTitle && curr.title === card2.cardTitle) {
          return { ...curr, isFound: true };
        }
        return curr;
      });

      dispatchSetData({
        type: "SET_DATA",
        payload: foundListCard,
      });
    }

    //Directly reset the selection in case of a match
    if (cardsSelection.length === 2 && card1.cardTitle === card2.cardTitle) {
      setCardsSelection([]);
    }

    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      //Only cards found can keep the "selected" value and therefore appear face up
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

      if (resetSelectedCardList.length) {
        dispatchSetData({
          type: "SET_DATA",
          payload: resetSelectedCardList,
        });
      }

      //Hold the selection for one second before it resets
      if (cardsSelection.length === 2 && card1.cardTitle !== card2.cardTitle) {
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
          dispatchSetFirstClickOnCard={dispatchSetFirstClickOnCard}
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
