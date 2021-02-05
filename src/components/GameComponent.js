import React, { Component } from 'react'
import Row from './Row'
import * as utilities from '../utilities.js'
import { cloneDeep } from 'lodash'
import GameResultComponent from './GameResultComponent'
import styled from 'styled-components/macro'

const ParentCont = styled.div`
  display: flex;
  justify-content: ${(props) => (props.mobile ? 'flex-end' : 'space-around')};
  flex-direction: ${(props) => (props.mobile ? 'column-reverse' : 'row')};
  flex-grow: 1;
`

const Board = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`

const Stats = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.mobile ? 'row' : 'column')};
  justify-content: ${(props) =>
    props.mobile ? 'space-between' : 'flex-start'};
  font-size: ${(props) => (props.mobile ? '15px' : '35px')};

  & p {
    color: #b1e6b5;
  }
`

export default class GameComponent extends Component {
  constructor(props) {
    super(props)
    this.state = utilities.defaultState
    this.interval = null
    this.onTapOrSpace = this.onTapOrSpace.bind(this)
  }

  componentDidMount() {
    this.spaceAction()
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  onTapOrSpace() {
    if (!this.state.playing) {
      //to start moving
      this.setState({ playing: true, speed: 150 })
      this.tick()
    } else {
      //add new empty row in front on every tick
      const fieldCopy = cloneDeep(this.state.field)
      fieldCopy.unshift(new Array(15).fill(false))
      this.setState(
        // set new field, update active row
        { field: fieldCopy, activeRow: this.state.activeRow + 1 },
        () => {
          //set new active row
          this.setState({ activeRow: this.state.activeRow - 1 }, () => {
            const fullMatch = utilities.determineFullMatch(
              this.state.field,
              this.state.activeRow
            )
            this.setState(
              {
                bonusScore: utilities.bonusCounter(
                  this.state.bonusScore,
                  fullMatch
                ),
              },
              () => {
                const {
                  field,
                  activeRow,
                  bonusScore,
                  activeSize,
                  intialSize,
                } = this.state
                const newField = utilities.fillRow(
                  field,
                  activeRow,
                  bonusScore,
                  activeSize,
                  intialSize
                )
                this.setState({ field: newField }, () => {
                  const newSize = utilities.findSize(
                    this.state.field[this.state.activeRow]
                  )
                  this.setState({
                    activeSize: newSize,
                    totalFloors: this.state.totalFloors + 1,
                  })
                  if (
                    this.state.totalFloors > 0 &&
                    !(this.state.totalFloors % 10)
                  ) {
                    this.setState(
                      {
                        speed:
                          this.state.speed +
                          utilities.setSpeed(this.state.totalFloors),
                      },
                      () => {
                        clearInterval(this.interval)
                        this.interval = setInterval(
                          this.movingIntervalCallback.bind(this),
                          this.state.speed
                        )
                      }
                    )
                  }
                })
              }
            )
          })
        }
      )
    }
  }

  spaceAction() {
    document.body.onkeyup = (e) => {
      if (e.code === 'Space') {
        this.onTapOrSpace()
      }
    }
    const gameTouchArea = document.getElementsByClassName('touch-area')[0]
    if (gameTouchArea) {
      gameTouchArea.addEventListener('touchend', this.onTapOrSpace)
    }
  }

  movingIntervalCallback() {
    if (this.state.field[this.state.activeRow][0]) {
      this.setState({ direction: 'right' })
    }
    if (
      this.state.field[this.state.activeRow][
        this.state.field[this.state.activeRow].length - 1
      ]
    ) {
      this.setState({ direction: 'left' })
    }
    const { field, activeRow, direction, activeSize } = this.state
    if (!activeSize) {
      this.setState({
        gameOver: true,
        playing: false,
        totalFloors: this.state.totalFloors - 1,
      })
      clearInterval(this.interval)
    }
    const newField = utilities.moveDots(field, activeRow, direction, activeSize)
    this.setState({ field: newField })
  }

  tick() {
    this.interval = setInterval(
      this.movingIntervalCallback.bind(this),
      this.state.speed
    )
  }

  setGameOver() {
    this.setState(utilities.defaultState)
  }

  render() {
    const {
      totalFloors,
      speed,
      bonusScore,
      playing,
      gameOver,
      field,
    } = this.state
    return (
      <div style={{ position: 'relative', height: '100%' }}>
        <ParentCont mobile={this.props.mobile} className='touch-area'>
          <Board>
            {utilities.sliceFieldPartToShow(field).map((el, idx) => (
              <Row row={el} key={idx} mobile={this.props.mobile} />
            ))}
          </Board>
          <Stats mobile={this.props.mobile}>
            <p>Floors: {totalFloors}</p>
            <p>Speed: {speed ? 200 - speed : 0} mph</p>
            <p>Bonus: {bonusScore}</p>
          </Stats>
        </ParentCont>
        {!playing ? (
          <div className='message-start font'>
            Hit spacebar or tap to start!
          </div>
        ) : null}
        {gameOver ? (
          <GameResultComponent
            currentResult={{ totalFloors, field, user: this.props.user }}
            setGameOver={() => {
              this.setGameOver()
            }}
            mobile={this.props.mobile}
          />
        ) : null}
      </div>
    )
  }
}
