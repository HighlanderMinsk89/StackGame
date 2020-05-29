import React from "react";
import LeaderCardComponent from "./LeaderCardComponent";

export default function LeadersComponent({ leadersTable }) {
  return (
    <div className="leaders-container">
      {leadersTable &&
        leadersTable.top3.map((record, idx) => {
          return (
            <LeaderCardComponent
              blockHeight={100 / leadersTable.top3[0].totalFloors}
              key={idx}
              record={record}
              index={idx}
            />
          );
        })}
      {leadersTable && (!leadersTable.rank || leadersTable.rank > 3) ? (
        <LeaderCardComponent
          blockHeight={100 / leadersTable.top3[0].totalFloors}
          record={leadersTable.newRecord}
          rank={leadersTable.rank}
        />
      ) : null}
    </div>
  );
}
