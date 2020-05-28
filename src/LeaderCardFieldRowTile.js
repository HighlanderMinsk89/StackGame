import React from "react";

const notActive = {
  backgroundColor: "rgb(2, 17, 5)",
  height: `100%`,
  width: "6.66666667%",
  //   borderRadius: "90%",
  //   margin: "2px 2px 3px 2px",
};
const active = {
  backgroundColor: "yellowgreen",
  height: `100%`,
  width: "6.66666667%",
  boxShadow: "inset 0px 0px 3px 0.5px green",
  border: "0.3px solid black",
};

export default function LeaderCardFieldRowTile({ tile }) {
  return <div style={tile ? active : notActive}></div>;
}
