import React from 'react'
import styled from 'styled-components/macro'
import LeaderCardComponent from './LeaderCardComponent'

const LeadersContainer = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: ${(props) => (props.mobile ? 'column' : 'row')};
  justify-content: ${(props) => (props.mobile ? 'flex-start' : 'space-around')};
  flex-wrap: wrap;
`

export default function LeadersComponent({ leadersTable, mobile }) {
  return (
    <LeadersContainer mobile={mobile}>
      {leadersTable &&
        leadersTable.top3.map((record, idx) => {
          return (
            <LeaderCardComponent
              blockHeight={100 / leadersTable.top3[0].totalFloors}
              key={idx}
              record={record}
              index={idx}
              mobile={mobile}
            />
          )
        })}
      {leadersTable && (!leadersTable.rank || leadersTable.rank > 3) ? (
        <LeaderCardComponent
          blockHeight={100 / leadersTable.top3[0].totalFloors}
          record={leadersTable.newRecord}
          rank={leadersTable.rank}
          mobile={mobile}
        />
      ) : null}
    </LeadersContainer>
  )
}
