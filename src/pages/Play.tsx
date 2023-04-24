import { useState, useEffect } from "react";

import CardList from "../components/Main/CardList";
import Counter from "../components/Main/Counter";
import Modal from "../components/Main/Modal";
import GetData from "../data/cardListLvlUp";
interface CardListProps {
  id: number;
  title: string;
  imgFront: string;
  imgBack: string;
  isFound: boolean;
  isSelected: boolean;
}
interface OpenModalContentProps {
  content: JSX.Element | null;
}

function Play() {
  const [level, setLevel] = useState<number>(1);
  const [cardList, setCardList] = useState<CardListProps[]>([]);
  const [timerStartingValue, setTimerStartingValue] = useState<number>(45);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalContent, setOpenModalContent] =
    useState<OpenModalContentProps>({ content: null });
  const [firstClickOnCard, setFirstClickOnCard] = useState<boolean>(false);
  const [transitionDurationIsActive, setTransitionDurationIsActive] =
    useState<boolean>(true);

  const data = GetData(level);
  const allPairsFound = cardList.every((objet) => objet.isFound === true);

  useEffect(() => {
    setCardList(data.data);
    setTimerStartingValue(data.timer);
  }, [level]);

  useEffect(() => {
    if (allPairsFound) {
      const timer = setTimeout(() => {
        setOpenModalContent({
          content: (
            <>
              <h2>Bravo, tu as trouvé toutes les paires !</h2>
              <button onClick={onNextLevelButtonClick}>
                Jouer au niveau suivant
              </button>
            </>
          ),
        });
        setOpenModal(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setOpenModalContent({
        content: (
          <>
            <h2>Temps écoulé !</h2>
            <button onClick={onReplayButtonClick}>Rejouer</button>
          </>
        ),
      });
    }
  }, [cardList]);

  const onNextLevelButtonClick = () => {
    setLevel((prevLevel) => prevLevel + 1);
    setOpenModal(false);
    setTransitionDurationIsActive(false);
  };

  const onReplayButtonClick = () => {
    setLevel(1);
    setOpenModal(false);
    setFirstClickOnCard(false);
    const shuffledCardList = cardList.sort(() => Math.random() - 0.5);
    setCardList(
      shuffledCardList.map((currentCard) => {
        return { ...currentCard, isSelected: false, isFound: false };
      })
    );
    setTimerStartingValue(GetData(1).timer);
  };

  return (
    <>
      <p>Niveau : {level}</p>
      {!allPairsFound && (
        <Counter
          timerStartingValue={timerStartingValue}
          setOpenModal={setOpenModal}
          setTimerStartingValue={setTimerStartingValue}
          firstClickOnCard={firstClickOnCard}
        />
      )}

      <CardList
        cardList={cardList}
        setCardList={setCardList}
        setFirstClickOnCard={setFirstClickOnCard}
        transitionDurationIsActive={transitionDurationIsActive}
        setTransitionDurationIsActive={setTransitionDurationIsActive}
      />
      {openModal && <Modal>{openModalContent.content}</Modal>}
    </>
  );
}

export default Play;
