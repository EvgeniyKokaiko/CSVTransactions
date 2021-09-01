import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
} from "@chakra-ui/react";
import React from "react";
import { Data } from "../../Interfaces";

export const ModalConditions = (
  modal: number,
  onClose: Function,
  deleteItem: Function,
  deletedItem: Data,
  editElement: Function,
  editableValue: string,
  setEditableValue: Function
) => {
  if (modal === 1) {
    return (
      <ModalContent>
        <ModalHeader>Delete Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div> Are you sure about it?</div>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={() => onClose()}>
            Close
          </Button>
          <Button onClick={() => deleteItem(deletedItem)} colorScheme="green">
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    );
  } else if (modal === 2) {
    return (
      <ModalContent>
        <ModalHeader>Edit Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div> Are you sure about it?</div>
          <Select
            style={{ width: "22vw" }}
            placeholder="Change status"
            size="md"
            bg="white"
            value={editableValue}
            onChange={(e) => setEditableValue(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Canceled</option>
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={() => onClose()}>
            Close
          </Button>
          <Button onClick={() => editElement()} colorScheme="green">
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    );
  } else {
    return <div></div>;
  }
};
