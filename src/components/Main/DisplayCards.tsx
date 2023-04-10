import { cardList } from "../../data/cardList";
import Card from "./Card";

const DisplayCards = () => {
  return (
    <div className="card-list">
      {cardList.map((card) => (
        <Card key={card.id} title={card.title} imgUrl={card.imgUrl} />
      ))}
    </div>
  );
};

export default DisplayCards;
