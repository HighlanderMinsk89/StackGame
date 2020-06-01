import React from "react";

const notActive = {
  backgroundColor: "rgba(81, 94, 81, 0.514)",
  width: "1rem",
  height: "0.5rem",
  borderRadius: "10%",
  margin: "0.12rem",
};
const active = {
  backgroundColor: "#2aff0e",
  width: "1rem",
  height: "0.5rem",
  borderRadius: "10%",
  boxShadow: "0px 0px 8px 1px rgba(28,255,54,0.79)",
  margin: "0.12rem",
};

export default function Dot({ dot }) {
  return <div style={dot ? active : notActive}></div>;
}
