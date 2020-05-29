import React from "react";

export default function LeaderCardInfoComponent({ rank, record, index }) {
  return (
    <div className="leader-info">
      <h1>Rank: {index ? index : rank ? rank : "100+"}</h1>
      <h2>{record.totalFloors} Floors</h2>
      <div className="leader-info-user">
        <h3>{record.user.name}</h3>
        <h4>
          {record.user.city}, {record.user.country}
        </h4>
      </div>
    </div>
  );
}
