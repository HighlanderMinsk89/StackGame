import React from "react";
import LeaderCardFieldRowTile from "./LeaderCardFieldRowTile";

export default function LeaderCardFieldRow({ blockHeight, row }) {
  return (
    <div
      className="leader-card-field-row"
      style={{
        height: `${blockHeight}%`,
      }}
    >
      {row &&
        row.map((tile, idx) => (
          <LeaderCardFieldRowTile key={idx} tile={tile} />
        ))}
    </div>
  );
}
