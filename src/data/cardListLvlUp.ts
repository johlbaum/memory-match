import ace from "../assets/ace.png";
import king from "../assets/king.png";
import queen from "../assets/queen.png";
import jack from "../assets/jack.png";
import backImg from "../assets/back.png";

interface Card {
  title: string;
  imgFront: string;
  imgBack: string;
  isFound: boolean;
  [key: string]: any;
}

interface GameLevel {
  level: number;
  numberOfCards: number;
  timer: number;
}

const cardListData: Card[] = [
  {
    title: "ace",
    imgFront: ace,
    imgBack: backImg,
    isFound: false,
  },
  {
    title: "king",
    imgFront: king,
    imgBack: backImg,
    isFound: false,
  },
  {
    title: "queen",
    imgFront: queen,
    imgBack: backImg,
    isFound: false,
  },
  {
    title: "jack",
    imgFront: jack,
    imgBack: backImg,
    isFound: false,
  },
];

const gameLevel: GameLevel[] = [
  {
    level: 1,
    numberOfCards: 3,
    timer: 45,
  },
  {
    level: 2,
    numberOfCards: 4,
    timer: 45,
  },
  {
    level: 3,
    numberOfCards: 4,
    timer: 30,
  },
  {
    level: 4,
    numberOfCards: 6,
    timer: 45,
  },
];

const gameLevelSelection = (level: number): GameLevel[] => {
  const levelSelected = gameLevel.filter((curr) => {
    return curr.level === level;
  });
  const singleCardsArray = cardListData.slice(
    0,
    levelSelected[0].numberOfCards
  );

  const duplicateCardList: Card[] = [];

  singleCardsArray.forEach((item) => {
    for (let i = 0; i < levelSelected[0].numberOfCards; i++) {
      const newItem = { ...item };
      duplicateCardList.push(newItem);
    }
  });
  const shuffledCards = duplicateCardList.sort(() => Math.random() - 0.5);
  return shuffledCards;
};

export default gameLevelSelection;
