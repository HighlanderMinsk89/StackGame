import React from 'react'
import Dot from './Dot'

export default function Row({ row, mobile }) {
  return (
    <div className='row'>
      {row.map((dot, idx) => (
        <Dot key={idx} dot={dot} mobile={mobile} />
      ))}
    </div>
  )
}
