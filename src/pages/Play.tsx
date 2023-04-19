import { useState } from "react";

import CardList from "../components/Main/CardList";
import Counter from "../components/Main/Counter";
import Modal from "../components/Main/Modal";
import CardListLvlUp from "../data/cardListLvlUp";

function Play() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [level, setLevel] = useState<number>(1);

  const cardListLvlUp = CardListLvlUp(level);

  return (
    <>
      <Counter timer={cardListLvlUp.timer} setOpenModal={setOpenModal} />
      <CardList data={cardListLvlUp.data} />
      {openModal && (
        <Modal>
          <h2>Bravo, tu as trouvé toutes les paires !</h2>
          <button onClick={() => setLevel((prevLevel) => prevLevel + 1)}>
            Jouer au niveau suivant
          </button>
        </Modal>
      )}
    </>
  );
}

export default Play;
