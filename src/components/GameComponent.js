import React, { Component } from "react";
import Row from "./Row";
import * as utilities from "../utilities.js";
import { cloneDeep } from "lodash";
import GameResultComponent from "./GameResultComponent";

export default class GameComponent extends Component {
  constructor(props) {
    super(props);
    this.state = utilities.defaultState;
    this.interval = null;
  }

  componentDidMount() {
    this.spaceAction();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  spaceAction() {
    document.body.onkeyup = (e) => {
      if (e.keyCode === 32) {
        if (!this.state.playing) {
          //to start moving
          this.setState({ playing: true, speed: 150 });
          this.tick();
        } else {
          //add new empty row in front on every tick
          const fieldCopy = cloneDeep(this.state.field);
          fieldCopy.unshift(new Array(15).fill(false));
          this.setState(
            // set new field, update active row
            { field: fieldCopy, activeRow: this.state.activeRow + 1 },
            () => {
              //set new active row
              this.setState({ activeRow: this.state.activeRow - 1 }, () => {
                const fullMatch = utilities.determineFullMatch(
                  this.state.field,
                  this.state.activeRow
                );
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
                    } = this.state;
                    const newField = utilities.fillRow(
                      field,
                      activeRow,
                      bonusScore,
                      activeSize,
                      intialSize
                    );
                    this.setState({ field: newField }, () => {
                      const newSize = utilities.findSize(
                        this.state.field[this.state.activeRow]
                      );
                      this.setState({
                        activeSize: newSize,
                        totalFloors: this.state.totalFloors + 1,
                      });
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
                            clearInterval(this.interval);
                            this.interval = setInterval(
                              this.movingIntervalCallback.bind(this),
                              this.state.speed
                            );
                          }
                        );
                      }
                    });
                  }
                );
              });
            }
          );
        }
      }
    };
  }

  movingIntervalCallback() {
    if (this.state.field[this.state.activeRow][0]) {
      this.setState({ direction: "right" });
    }
    if (
      this.state.field[this.state.activeRow][
        this.state.field[this.state.activeRow].length - 1
      ]
    ) {
      this.setState({ direction: "left" });
    }
    const { field, activeRow, direction, activeSize } = this.state;
    if (!activeSize) {
      this.setState({
        gameOver: true,
        playing: false,
        totalFloors: this.state.totalFloors - 1,
      });
      clearInterval(this.interval);
    }
    const newField = utilities.moveDots(
      field,
      activeRow,
      direction,
      activeSize
    );
    this.setState({ field: newField });
  }

  tick() {
    this.interval = setInterval(
      this.movingIntervalCallback.bind(this),
      this.state.speed
    );
  }

  setGameOver() {
    this.setState(utilities.defaultState);
  }

  render() {
    const {
      totalFloors,
      speed,
      bonusScore,
      playing,
      gameOver,
      field,
    } = this.state;
    return (
      <>
        <div className="parent-cont">
          <div className="cont">
            {utilities.sliceFieldPartToShow(field).map((el, idx) => {
              return <Row row={el} key={idx} />;
            })}
          </div>
          <div className="stats">
            <h1>Floors: {totalFloors}</h1>
            <h1>Speed: {speed ? 200 - speed : 0} mph</h1>
            <h3>Bonus: {bonusScore}</h3>
          </div>
        </div>
        {!playing ? (
          <div className="message-start font">
            Press Spacebar to start the game and stack the blocks! <br></br>
            Stack 5 blocks perfectly in a row to expand your block back!
          </div>
        ) : null}
        {gameOver ? (
          <GameResultComponent
            currentResult={{ totalFloors, field, user: this.props.user }}
            setGameOver={() => {
              this.setGameOver();
            }}
          />
        ) : null}
      </>
    );
  }
}
