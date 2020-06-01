import React from "react";

const notActive = {
  backgroundColor: "rgb(2, 17, 5)",
  height: `100%`,
  width: "6.66666667%",
};
const active = {
  backgroundColor: "yellowgreen",
  height: `100%`,
  width: "6.66666667%",
  // margin: "0.05px",
  border: "1px solid black",
  padding: "1px",
};

export default function LeaderCardFieldRowTile({ tile }) {
  return <div style={tile ? active : notActive}></div>;
}
