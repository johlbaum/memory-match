import ace from "../assets/ace.png";
import king from "../assets/king.png";
import queen from "../assets/queen.png";
import jack from "../assets/jack.png";
import sixClub from "../assets/six-club.png";
import forDiamond from "../assets/for-diamond.png";
import tenDiamond from "../assets/ten-diamond.png";
import twoClub from "../assets/two-club.png";
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
  {
    title: "sixClub",
    imgFront: sixClub,
    imgBack: backImg,
    isFound: false,
  },
  {
    title: "forDiamond",
    imgFront: forDiamond,
    imgBack: backImg,
    isFound: false,
  },
  {
    title: "tenDiamond",
    imgFront: tenDiamond,
    imgBack: backImg,
    isFound: false,
  },
  {
    title: "twoClub",
    imgFront: twoClub,
    imgBack: backImg,
    isFound: false,
  },
];

const gameLevel: GameLevel[] = [
  {
    level: 1,
    numberOfCards: 3,
    timer: 5,
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
  {
    level: 5,
    numberOfCards: 6,
    timer: 30,
  },
];

const getDataByLevel = (level: number) => {
  const levelSelectedInformation = gameLevel.filter((curr) => {
    return curr.level === level;
  });
  const timer = levelSelectedInformation[0].timer;
  const singleCardList = cardListData.slice(
    0,
    levelSelectedInformation[0].numberOfCards
  );

  const duplicateCardList: Card[] = [];

  singleCardList.forEach((card) => {
    for (let i = 0; i < 2; i++) {
      const newCard = { ...card };
      duplicateCardList.push(newCard);
    }
  });

  const shuffledCardList = duplicateCardList.sort(() => Math.random() - 0.5);

  const cardsWithId = shuffledCardList.map((curr, i) => {
    return {
      ...curr,
      id: i + 1,
    };
  });

  return {
    data: cardsWithId,
    timer: timer,
  };
};

export default getDataByLevel;
