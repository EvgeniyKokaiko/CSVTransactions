import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Data, Store } from "../Interfaces";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import Modal from "./Modal";
import CSVContext from "../CSVContext/CSVContext";
import Pagination from "./Pagination";
import { ModalConditions } from "./Modal/ModalCondition";

const TransactionTable = () => {
  const [data, setData]: [Data[], Function] = useState([]);
  const [modal, setModal] = useState(0);
  const { setContext } = useContext(CSVContext);
  const [deletedItem, setDeleteItem]: [any, Function] = useState({});
  const [filter, setFilter]: [Data[], Function] = useState([]);
  const [searchedStatus, setSearchedStatus]: [string, Function] = useState("");
  const [searchedType, setSearchedType]: [string, Function] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editableElement, setEditableElement] = useState({});
  const [page, setPage] = useState(0);
  const [editableValue, setEditableValue] = useState("");
  const store = useSelector<Store>((state) => state.dataReducer[1]);
  useEffect(() => {
    if (store) {
      setData(store);
      setContext(store);
    }
    /***
     * i've use eslint disabler commend to remove eslint warning(if i'll add dependency, i'll get infinity loop)
     */
    // eslint-disable-next-line
  }, [store]);

  useEffect(() => {
    setContext(renderCondition());
    /***
     * i've use eslint disabler commend to remove eslint warning(if i'll add dependency, i'll get infinity loop)
     */
    // eslint-disable-next-line
  }, [renderCondition]);

  useEffect(() => {
    setFilter([]);
    if (data) {
      const Filter: Data[] = data.filter((el) => {
        return (
          el.Status.toLowerCase().includes(
            String(searchedStatus.toLowerCase())
          ) &&
          el.Type.toLowerCase().includes(String(searchedType.toLowerCase()))
        );
      });
      setFilter(Filter);
      setContext(Filter);
    }
    /***
     * i've use eslint disabler commend to remove eslint warning(if i'll add dependency, i'll get infinity loop)
     */
    // eslint-disable-next-line
  }, [searchedStatus, searchedType, data]);

  function renderCondition() {
    if (searchedStatus === "" && searchedType === "") {
      return data;
    } else {
      return filter;
    }
  }

  function deleteItem(item: Data) {
    setData(data.filter((el) => el !== item));
  }

  const RenderList = () => {
    return renderCondition().map((el, index) => {
      if (index >= page * 20 && index < page * 20 + 20) {
        return (
          <Tr key={el.ClientName}>
            <Td>{el.TransactionId}</Td>
            <Td>{el.Status}</Td>
            <Td>{el.Type}</Td>
            <Td>{el.ClientName}</Td>
            <Td isNumeric>{el.Amount}</Td>
            <Td>
              <button
                  style={{color: "green"}}
                onClick={() => {
                  setModal(2);
                  onOpen();
                  setEditableElement(el);
                }}
              >
                Edit
              </button>
              |{" "}
              <button
                  style={{color: "red"}}
                onClick={() => {
                  onOpen();
                  setDeleteItem(el);
                  setModal(1);
                }}
              >
                Delete
              </button>
            </Td>
          </Tr>
        );
      }
      return true;
    });
  };

  const RenderTable = () => {
    return (
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>TransactionId</Th>
            <Th>Status</Th>
            <Th>Type</Th>
            <Th>ClientName</Th>
            <Th isNumeric>Amount</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>{RenderList()}</Tbody>
        <Tfoot>
          <Tr>
            <Th>TransactionId</Th>
            <Th>Status</Th>
            <Th>Type</Th>
            <Th>ClientName</Th>
            <Th isNumeric>Amount</Th>
            <Th>Actions</Th>
          </Tr>
        </Tfoot>
      </Table>
    );
  };

  const editElement = () => {
    let edited = renderCondition().map((el) => {
      if (el === editableElement) {
        el.Status = editableValue;
      }
      return el;
    });
    setContext(edited);
    return edited;
  };

  const ModalCondition = () => {
    return ModalConditions(
      modal,
      onClose,
      deleteItem,
      deletedItem,
      editElement,
      editableValue,
      setEditableValue
    );
  };

  return (
    <div>
      <div className="dropdown_container">
        <Select
          value={searchedStatus}
          onChange={(e) => {
            setSearchedStatus(e.target.value);
          }}
          style={{ width: "30vw", marginLeft: "10vw", marginRight: "5vw" }}
          placeholder="Select status"
          size="md"
          bg="white"
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Canceled</option>
        </Select>
        <Select
          style={{ width: "30vw" }}
          placeholder="Select type"
          size="md"
          bg="white"
          value={searchedType}
          onChange={(e) => {
            setSearchedType(e.target.value);
          }}
        >
          <option value="Refill">Refill</option>
          <option value="Withdrawal">Withdrawal</option>
        </Select>
      </div>
      <Pagination
        setPage={setPage}
        data={renderCondition()}
        style={{ marginTop: "2vh", marginBottom: "0vh", paddingBottom: "-2vh" }}
      />
      <div className="table_wrapper">{RenderTable()}</div>
      {isOpen ? (
        <Modal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          RenderModal={ModalCondition}
        />
      ) : (
        ""
      )}
      <Pagination setPage={setPage} data={renderCondition()} />
    </div>
  );
};

export default TransactionTable;
