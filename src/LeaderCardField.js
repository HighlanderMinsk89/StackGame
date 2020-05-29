import React from "react";
import LeaderCardFieldRow from "./LeaderCardFieldRow";

export default function LeaderCardField({ blockHeight, recordField, rank }) {
  return (
    <div
      className="leader-card-field"
      style={{
        height: "100%",
        border: rank === false || rank ? "8px solid #1934FF" : "",
      }}
    >
      {recordField &&
        recordField.map((row, idx) => (
          <LeaderCardFieldRow row={row} blockHeight={blockHeight} key={idx} />
        ))}
    </div>
  );
}
