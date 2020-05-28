import React, { useEffect, useState } from "react";
import LeadersComponent from "./LeadersComponent";
import { generateResultMessage, calculateAndSaveResults } from "./utilities";

export default function GameResultComponent({ currentResult, setGameOver }) {
  const [leadersTable, setLeadersTable] = useState(null);
  console.log("currentResult: ", leadersTable);

  useEffect(() => {
    fetch("https://stack-it-73fd3.firebaseio.com/records.json")
      .then((response) => response.json())
      .then((data) => {
        const leadersResult = calculateAndSaveResults(data, currentResult);
        setLeadersTable(leadersResult);
      })
      .catch((err) => console.error("Error", err));
  }, [currentResult]);
  return (
    <div
      className="modal is-active"
      style={{
        justifyContent: "start",
        paddingTop: "10rem",
        textAlign: "center",
      }}
    >
      <div
        className="modal-background"
        style={{ backgroundColor: "#072418e0" }}
      ></div>
      <div
        className="modal-content"
        style={{ width: "100%", overflow: "initial" }}
      >
        <div style={{ padding: "2rem 0", backgroundColor: "black" }}>
          <div className="leaders-message">
            {leadersTable && generateResultMessage(leadersTable.rank)}
          </div>
          <LeadersComponent leadersTable={leadersTable} />

          <button
            className="button is-success is-outlined font"
            style={{ marginTop: "2rem" }}
            onClick={() => {
              setGameOver();
            }}
          >
            Play Again!
          </button>
        </div>
      </div>
    </div>
  );
}
