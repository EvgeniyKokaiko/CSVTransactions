import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { getDataFromCSV } from "../redux/actions/actions";
import { Button } from "@chakra-ui/react";
import { CSVLink } from "react-csv";
import CSVContext from "../CSVContext/CSVContext";

const Header = () => {
  const dispatch = useDispatch();
  const { context } = useContext(CSVContext);

  return (
    <div className="header">
      <span>
        <label
          className="header_button chakra-button css-10p4gz7"
          htmlFor="filePicker"
          style={{ width: "7vw", height: "4vh", fontSize: "1.5em" }}
        >
          Import
        </label>
        <input
          id="filePicker"
          style={{ visibility: "hidden" }}
          type={"file"}
          onChange={(e) => dispatch(getDataFromCSV(e))}
        />
      </span>
      <Button
        colorScheme="teal"
        size="xs"
        style={{ width: "7vw", height: "4vh", fontSize: "1.5em" }}
      >
        <CSVLink data={context} filename="data.csv">
          Export
        </CSVLink>
      </Button>
    </div>
  );
};

export default Header;
