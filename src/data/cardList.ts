import ace from "../assets/ace.png";
import king from "../assets/king.png";
import queen from "../assets/queen.png";
import jack from "../assets/jack.png";
import backImg from "../assets/back.png";
interface Card {
  title: string;
  imgFront: string;
  imgBack: string;
  [key: string]: any;
}

const cardListData: Card[] = [
  {
    title: "ace",
    imgFront: ace,
    imgBack: backImg,
  },
  {
    title: "king",
    imgFront: king,
    imgBack: backImg,
  },
  {
    title: "queen",
    imgFront: queen,
    imgBack: backImg,
  },
  {
    title: "jack",
    imgFront: jack,
    imgBack: backImg,
  },
];

const cardList = () => {
  const shuffledCards = [...cardListData, ...cardListData].sort(
    () => Math.random() - 0.5
  );
  const cardsWithId = shuffledCards.map((curr, i) => {
    return {
      ...curr,
      id: i + 1,
    };
  });
  return cardsWithId;
};

export default cardList;
