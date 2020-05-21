import React, { Component } from "react";
import Row from "./Row";
import * as utilities from "./utilities.js";
import { cloneDeep } from "lodash";

export default class Game extends Component {
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
          this.setState({ playing: true });
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
      this.setState({ gameOver: true, playing: false });
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

  stop() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <>
        {this.state.gameOver ? <h1>Game Over</h1> : null}
        <div className="cont">
          {utilities.sliceFieldPartToShow(this.state.field).map((el, idx) => {
            return <Row row={el} key={idx} />;
          })}
        </div>

        <button
          className="button"
          onClick={() => {
            this.stop();
          }}
        >
          stop
        </button>
        <h1 style={{ color: "white", fontSize: "40px" }}>{this.state.score}</h1>
        <h1 style={{ color: "white", fontSize: "40px" }}>
          {this.state.totalFloors} Floors
        </h1>
        <span>
          <h1 style={{ color: "white", fontSize: "40px" }}>
            Speed: {150 - this.state.speed}
          </h1>
          <h3 style={{ color: "white", fontSize: "40px" }}>
            Bonus: {this.state.bonusScore}
          </h3>
        </span>
      </>
    );
  }
}
