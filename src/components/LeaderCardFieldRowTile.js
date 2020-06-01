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
  border: "0.05px solid black",
  padding: "0,05px",
};

export default function LeaderCardFieldRowTile({ tile }) {
  return <div style={tile ? active : notActive}></div>;
}
