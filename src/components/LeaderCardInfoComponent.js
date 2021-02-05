import React from 'react'
import styled, { css } from 'styled-components/macro'

const LeaderInfo = styled.div`
  display: flex;
  color: whitesmoke;
  flex-direction: ${(props) => (props.mobile ? 'row' : 'column')};
  ${(props) =>
    props.mobile
      ? css`
          justify-content: space-between;
          /* background-color: purple; */
          width: 100%;
          align-items: center;
          padding: 0.3rem;
        `
      : ''}

  & > h2 {
    font-size: 20px;
    color: yellowgreen;
  }

  & .leader-info-user {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: ${(props) => (props.mobile ? 'column' : 'row')};
  }

  & .leader-info-user > h4 {
    font-size: 12px;
  }

  & .leader-info-user > h3 {
    font-size: 20px;
  }
`

export default function LeaderCardInfoComponent({
  rank,
  record,
  index,
  mobile,
}) {
  return (
    <LeaderInfo mobile={mobile}>
      <h1>Rank: {index ? index : rank ? rank : '100+'}</h1>
      <h2>{record.totalFloors} Floors</h2>
      <div className='leader-info-user'>
        <h3>{nameShortener(record.user.name)}</h3>
        <h4>
          {record.user.city}, {record.user.country}
        </h4>
      </div>
    </LeaderInfo>
  )
}

function nameShortener(name) {
  return name.length >= 12 ? name.slice(0, 12) + '..' : name
}
