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

function Play() {
  const [level, setLevel] = useState<number>(1);
  const [cardList, setCardList] = useState<CardListProps[]>([]);
  const [timerStartingValue, setTimerStartingValue] = useState<number>(45);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [firstClickOnCard, setFirstClickOnCard] = useState<boolean>(false);

  const [transitionDurationIsActive, setTransitionDurationIsActive] =
    useState<boolean>(true);

  const data = GetData(level);

  useEffect(() => {
    setCardList(data.data);
    setTimerStartingValue(data.timer);
  }, [level]);

  //const cardListLvlUp = CardListLvlUp(level);

  const onNextLevelButtonClick = () => {
    setLevel((prevLevel) => prevLevel + 1);
    setOpenModal(false);
  };

  const onReplayButtonClick = () => {
    setLevel(1);
    setOpenModal(false);
    const shuffledCardList = cardList.sort(() => Math.random() - 0.5);
    const newshuffledCardList = shuffledCardList.map((curr) => {
      return { ...curr, isSelected: false, isFound: false };
    });
    setCardList(newshuffledCardList);
    const initialTimer = GetData(1).timer; // Récupère la valeur initiale du timer pour le niveau 1
    setTimerStartingValue(initialTimer);
    setTransitionDurationIsActive(false);
  };

  const allPairsFound = cardList.every((objet) => objet.isFound === true);

  return (
    <>
      <p>Niveau : {level}</p>
      {/* <Counter
        timerStartingValue={timerStartingValue}
        setOpenModal={setOpenModal}
        setTimerStartingValue={setTimerStartingValue}
        firstClickOnCard={firstClickOnCard}
      /> */}
      <CardList
        cardList={cardList}
        setCardList={setCardList}
        setOpenModal={setOpenModal}
        setFirstClickOnCard={setFirstClickOnCard}
        transitionDurationIsActive={transitionDurationIsActive}
        setTransitionDurationIsActive={setTransitionDurationIsActive}
      />
      {openModal && (
        <Modal>
          {allPairsFound ? (
            <>
              <h2>Bravo, tu as trouvé toutes les paires !</h2>
              <button onClick={onNextLevelButtonClick}>
                Jouer au niveau suivant
              </button>
            </>
          ) : (
            <>
              <h2>Temps écoulé !</h2>
              <button onClick={onReplayButtonClick}>Rejouer</button>
            </>
          )}
        </Modal>
      )}
    </>
  );
}

export default Play;
