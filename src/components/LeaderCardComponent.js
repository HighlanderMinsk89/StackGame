import React from "react";
import LeaderCardField from "./LeaderCardField";
import LeaderCardInfoComponent from "./LeaderCardInfoComponent";

export default function LeaderCardComponent({
  blockHeight,
  rank,
  record,
  index,
}) {
  return (
    <div className="leader-card">
      <LeaderCardInfoComponent rank={rank} record={record} index={index + 1} />
      <LeaderCardField
        rank={rank}
        blockHeight={blockHeight}
        recordField={record.field}
      />
    </div>
  );
}
