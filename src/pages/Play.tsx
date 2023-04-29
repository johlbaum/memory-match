import { useEffect, useReducer, useState } from "react";

import CardList from "../components/Main/CardList";
import Counter from "../components/Main/Counter";
import Modal from "../components/Main/Modal";
import GetData from "../data/cardListLvlUp";
import Score from "../components/Main/Score";
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
interface State {
  level: number;
  openModal: boolean;
  firstClickOnCard: boolean;
  cardList: CardListProps[];
  timerStartingValue: number;
  transitionDurationIsActive: boolean;
}

const initialState: State = {
  level: 1,
  openModal: false,
  firstClickOnCard: false,
  cardList: [],
  timerStartingValue: 45,
  transitionDurationIsActive: true,
};

function reducer(
  state: State,
  action:
    | { type: "INCREMENT_LEVEL" }
    | { type: "RESET_LEVEL" }
    | { type: "SET_DATA"; payload: CardListProps[] }
    | { type: "UPDATE_TIMER"; payload: number }
    | { type: "RESET_TRANSITION_DURATION" }
    | { type: "RESET_FIRST_CLICK_ON_CARD" }
) {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        cardList: [...action.payload],
      };
    case "INCREMENT_LEVEL":
      return {
        ...state,
        level: state.level + 1,
        transitionDurationIsActive: false,
      };
    case "RESET_LEVEL":
      const shuffledCardList = state.cardList.sort(() => Math.random() - 0.5);
      const newShuffledCardList = shuffledCardList.map((currentCard) => {
        return { ...currentCard, isSelected: false, isFound: false };
      });
      return {
        ...state,
        level: 1,
        cardList: newShuffledCardList,
        firstClickOnCard: false,
        timerStartingValue: GetData(1).timer,
        transitionDurationIsActive: false,
      };
    case "UPDATE_TIMER":
      return {
        ...state,
        timerStartingValue: action.payload,
      };
    case "RESET_TRANSITION_DURATION":
      return {
        ...state,
        transitionDurationIsActive: true,
      };
    case "RESET_FIRST_CLICK_ON_CARD":
      return {
        ...state,
        firstClickOnCard: true,
      };
    default:
      throw new Error();
  }
}

function Play() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const data = GetData(state.level);
  const allPairsFound = state.cardList.every((objet) => objet.isFound === true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<OpenModalContentProps>({
    content: null,
  });

  useEffect(() => {
    dispatch({ type: "SET_DATA", payload: data.data });
    dispatch({ type: "UPDATE_TIMER", payload: data.timer });
  }, [state.level]);

  useEffect(() => {
    if (allPairsFound) {
      const timer = setTimeout(() => {
        setModalContent({
          content: (
            <>
              <h2>Bravo, tu as trouvé toutes les paires !</h2>
              <button
                onClick={() => {
                  dispatch({ type: "INCREMENT_LEVEL" });
                  setOpenModal(false);
                }}
              >
                Jouer au niveau suivant
              </button>
            </>
          ),
        });
        setOpenModal(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setModalContent({
        content: (
          <>
            <h2>Temps écoulé !</h2>
            <button
              onClick={() => {
                dispatch({ type: "RESET_LEVEL" });
                setOpenModal(false);
              }}
            >
              Rejouer
            </button>
          </>
        ),
      });
    }
  }, [state.cardList]);

  return (
    <>
      <p>Niveau : {state.level}</p>
      {/* {!allPairsFound && (
        <Counter
          timerStartingValue={state.timerStartingValue}
          setOpenModal={setOpenModal}
          firstClickOnCard={state.firstClickOnCard}
          dispatch={dispatch}
        />
      )} */}
      <Score />
      <CardList
        cardList={state.cardList}
        dispatchSetData={dispatch}
        dispatchSetTransitionDuration={dispatch}
        dispatchSetFirstClickOnCard={dispatch}
        transitionDurationIsActive={state.transitionDurationIsActive}
      />
      {openModal && <Modal>{modalContent.content}</Modal>}
    </>
  );
}

export default Play;
