import { CardProps } from "../../types/types";

const Card = (props: CardProps) => {
  return (
    <div className="card">
      <img src={props.imgUrl} alt={props.title} />
      <h3>{props.title}</h3>
    </div>
  );
};

export default Card;
