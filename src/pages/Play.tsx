import { useState } from "react";

import CardList from "../components/Main/CardList";
import Counter from "../components/Main/Counter";
import Modal from "../components/Main/Modal";

function Play() {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <Counter setOpenModal={setOpenModal} />
      <CardList />
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
