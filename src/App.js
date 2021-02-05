import React, { useState, useEffect } from 'react'
import { useBreakpoints } from 'react-breakpoints-hook'
import './App.css'
import GameComponent from './components/GameComponent'
import RegisterUserComponent from './components/RegisterUserComponent'
import { getUser } from './utilities'
import styled from 'styled-components/macro'
import GameHeader from './components/GameHeader'

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: ${(props) => (props.mobile ? '0.5em' : '0px')};
  height: 100%;
`

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.mobile ? '100%' : '700px')};
  min-width: ${(props) => (props.mobile ? '300px' : '700px')};
`

function App() {
  const [user, setUser] = useState(null)
  let { mobile } = useBreakpoints({
    mobile: { min: 0, max: 700 },
  })

  useEffect(() => {
    const user = getUser()
    if (user) setUser(user)
  }, [])

  useEffect(() => {}, [user])

  return (
    <AppContainer mobile={mobile}>
      {user ? (
        <GameWrapper mobile={mobile}>
          <GameHeader userName={user.name} mobile={mobile} />
          <GameComponent user={user} mobile={mobile} />
        </GameWrapper>
      ) : (
        <RegisterUserComponent user={user} setUser={setUser} />
      )}
    </AppContainer>
  )
}

export default App
