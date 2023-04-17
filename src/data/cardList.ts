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

const cardList = (level: string) => {
  let selectedLevel: number;
  switch (level) {
    case "facile":
      selectedLevel = 2;
      break;
    case "intermédiaire":
      selectedLevel = 3;
      break;
    case "difficile":
      selectedLevel = 4;
      break;
    default:
      selectedLevel = 2;
      break;
  }

  //Tableau d'objets de type Card où chaque élément est un objet qui a les propriétés title, imgFront, et imgBack de type string
  const duplicateCardList: Card[] = [];

  cardListData.forEach((item) => {
    for (let i = 0; i < selectedLevel; i++) {
      const newItem = { ...item };
      duplicateCardList.push(newItem);
    }
  });

  const shuffledCards = duplicateCardList.sort(() => Math.random() - 0.5);
  const cardsWithId = shuffledCards.map((curr, i) => {
    return {
      ...curr,
      id: i + 1,
    };
  });
  return cardsWithId;
};

export default cardList;
