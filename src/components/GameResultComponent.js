import React, { useEffect, useState } from "react";
import LeadersComponent from "./LeadersComponent";
import { generateResultMessage, calculateAndSaveResults } from "../utilities";
import LoadingSpinner from "./LoadingSpinner";

export default function GameResultComponent({ currentResult, setGameOver }) {
  const [leadersTable, setLeadersTable] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://stack-it-73fd3.firebaseio.com/records.json")
      .then((response) => response.json())
      .then((data) => {
        const leadersResult = calculateAndSaveResults(data, currentResult);
        setLeadersTable(leadersResult);
        setLoading(false);
      })
      .catch((err) => console.error("Error", err));
  }, [currentResult]);
  return (
    <div
      className="modal is-active"
      style={{
        justifyContent: "start",
        paddingTop: "5%",
        textAlign: "center",
      }}
    >
      <div
        className="modal-background"
        style={{ backgroundColor: "##013D00" }}
      ></div>
      <div
        className="modal-content"
        style={{
          width: "100%",
          overflow: "initial",
          maxHeight: "577px",
        }}
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div
            style={{
              padding: "2rem 0",
              backgroundColor: "black",
              minHeight: "500px",
            }}
          >
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
        )}
      </div>
    </div>
  );
}
