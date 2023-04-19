import { useState } from "react";

import CardList from "../components/Main/CardList";
import Counter from "../components/Main/Counter";
import Modal from "../components/Main/Modal";
import CardListLvlUp from "../data/cardListLvlUp";

function Play() {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const cardListLvlUp = CardListLvlUp(3);

  return (
    <>
      <Counter timer={cardListLvlUp.timer} setOpenModal={setOpenModal} />
      <CardList data={cardListLvlUp.data} />
      {openModal && (
        <Modal>
          <h2>Titre de la fenêtre modale</h2>
          <p>Contenu de la fenêtre modale</p>
        </Modal>
      )}
    </>
  );
}

export default Play;
