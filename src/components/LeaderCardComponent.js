import React from 'react'
import styled from 'styled-components/macro'
import LeaderCardField from './LeaderCardField'
import LeaderCardInfoComponent from './LeaderCardInfoComponent'

const LeaderCardStyled = styled.div`
  width: ${(props) => (props.mobile ? '100%' : '20%')};
  display: flex;
  height: ${(props) => (props.mobile ? '100px' : '45vh')};
  flex-direction: ${(props) => (props.mobile ? 'row' : 'column')};
`

export default function LeaderCardComponent({
  blockHeight,
  rank,
  record,
  index,
  mobile,
}) {
  return (
    <LeaderCardStyled mobile={mobile}>
      <LeaderCardInfoComponent
        rank={rank}
        record={record}
        index={index + 1}
        mobile={mobile}
      />
      {!mobile ? (
        <LeaderCardField
          rank={rank}
          blockHeight={blockHeight}
          recordField={record.field}
        />
      ) : null}
    </LeaderCardStyled>
  )
}
