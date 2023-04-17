import { ReactNode } from "react";

import "../../styles/modal.css";

type ModalProps = {
  children: ReactNode;
};

function Modal({ children }: ModalProps) {
  return (
    <div className="modal">
      <div className="modal-content">{children}</div>
    </div>
  );
}

export default Modal;
