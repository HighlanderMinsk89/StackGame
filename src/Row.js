import React from 'react';
import Dot from './Dot';

export default function Row({ row }) {
  return (
    <div className="row">
      {row.map((dot, idx) => {
        return <Dot key={idx} dot={dot} />;
      })}
    </div>
  );
}
