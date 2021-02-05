import React from 'react'
import styled from 'styled-components'

const StyledDot = styled.div`
  background-color: ${(props) =>
    props.dot ? '#2aff0e' : 'rgba(81, 94, 81, 0.514)'};
  border-radius: 10%;
  box-shadow: ${(props) =>
    props.dot ? '0px 0px 8px 1px rgba(28,255,54,0.79)' : 'none'};
  width: ${(props) => (props.mobile ? '1rem' : '1.3rem')};
  height: ${(props) => (props.mobile ? '0.5rem' : '0.65rem')};
  margin: ${(props) => (props.mobile ? '0.09rem' : '0.12rem')};
`

export default function Dot({ dot, mobile }) {
  return <StyledDot dot={dot} mobile={mobile}></StyledDot>
}
