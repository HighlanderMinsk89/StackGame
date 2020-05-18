import React from 'react';

const notActive = {
  backgroundColor: '#272424af',
  width: '1rem',
  height: '0.7rem',
  borderRadius: '10%',
  margin: '2px 2px 3px 2px',
};
const active = {
  backgroundColor: '#2aff0e',
  width: '1rem',
  height: '0.7rem',
  borderRadius: '10%',

  boxShadow: '0px 0px 8px 1px rgba(28,255,54,0.79)',
  margin: '2px',
};

const bonus = {
  backgroundColor: 'green',
  width: '20px',
  height: '15px',
  // borderRadius: '50%',
  margin: '2px',
};

export default function Dot({ dot }) {
  return <div style={dot ? active : notActive}></div>;
}
