import React from "react";
import { createPortal } from "react-dom";
import { Modal, ModalOverlay } from "@chakra-ui/react";

interface IProps {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
  RenderModal(): JSX.Element;
}

const Element = document.querySelector("#modal") as HTMLElement;

const ModalWindow = (props: IProps) => {
  return createPortal(
    <React.Fragment>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        {props.RenderModal()}
      </Modal>
    </React.Fragment>,
    Element
  );
};

export default ModalWindow;
