import React from "react";
import Dot from "./Dot";

export default function Row({ row }) {
  return (
    <div className="row">
      {row.map((dot, idx) => (
        <Dot key={idx} dot={dot} />
      ))}
    </div>
  );
}
