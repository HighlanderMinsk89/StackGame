import React from 'react'
import styled from 'styled-components'
import SocialLinks from './SocialLinks'

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & h1 {
    font-size: ${(props) => (props.mobile ? '25px' : '40px')};
    color: yellowgreen;
  }
`

const GameHeader = ({ mobile }) => {
  return (
    <HeaderWrapper className='header' mobile={mobile}>
      <h1>STACK IT!</h1>
      <SocialLinks />
    </HeaderWrapper>
  )
}

export default GameHeader
