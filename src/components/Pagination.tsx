import { Button } from "@chakra-ui/react";
import React from "react";
import { Data } from "../Interfaces";

interface IProps {
  setPage(p: number): void;
  data: Data[];
  style?: object;
}

const Pagination = (props: IProps) => {
  const RenderButtons = () => {
    const length = props.data.length;
    return props.data.map((el, index) => {
      if (index < length / 20)
        return (
          <Button
            key={index}
            onClick={() => props.setPage(index)}
            colorScheme="teal"
          >
            {index}
          </Button>
        );
      return true;
    });
  };

  return (
    <div className="pagination_container" style={props.style}>
      {RenderButtons()}
    </div>
  );
};

export default Pagination;
