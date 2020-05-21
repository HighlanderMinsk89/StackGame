import React, { Component } from "react";
import Row from "./Row";
import _ from "lodash";

const defaultState = {
  playing: false,
  activeRow: 49,
  activeSize: 7,
  intialSize: 7,
  totalFloors: 0,
  direction: "left",
  field: makeStartBoard(50, 15, 7),
  score: 0,
  speed: 150,
  gameOver: false,
  bonusScore: 0,
};

const sliceFieldPartToShow = (field) =>
  field.length >= 85 ? field.slice(35, 85) : field.slice(-50);

const setSpeed = (totalFloors) => {
  // if (totalFloors <= 30) return -20;
  switch (true) {
    case totalFloors <= 20:
      return -15;
    case totalFloors <= 40:
      return -10;
    case totalFloors <= 60:
      return -3;
    case totalFloors > 60:
      return -1;
    default:
      return totalFloors;
  }
};

const bonusCounter = (currentBonus, fullMatch) => {
  if (!fullMatch) return 0;
  else {
    if (currentBonus >= 5) return 1;
    else return currentBonus + 1;
  }
};

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
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
          this.setState({ ...defaultState, playing: true });
          this.tick();
        } else {
          //add new empty row in front on every tick
          const fieldCopy = _.cloneDeep(this.state.field);
          fieldCopy.unshift(new Array(15).fill(false));
          this.setState(
            // set new field, update active row
            { field: fieldCopy, activeRow: this.state.activeRow + 1 },
            () => {
              //set new active row
              this.setState({ activeRow: this.state.activeRow - 1 }, () => {
                let fullMatch = determineFullMatch(
                  this.state.field,
                  this.state.activeRow
                );
                this.setState(
                  {
                    bonusScore: bonusCounter(this.state.bonusScore, fullMatch),
                  },
                  () => {
                    const newField = fillRow(
                      this.state.field,
                      this.state.activeRow,
                      this.state.bonusScore,
                      this.state.activeSize,
                      this.state.intialSize
                    );
                    this.setState({ field: newField }, () => {
                      const newSize = findSize(
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
                              setSpeed(this.state.totalFloors),
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
    const newField = moveDots(field, activeRow, direction, activeSize);
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
          {sliceFieldPartToShow(this.state.field).map((el, idx) => {
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

function makeStartBoard(height, width, size) {
  const gameBoard = [];
  for (let i = 0; i < height; i++) {
    gameBoard.push([]);
    for (let j = 0; j < width; j++) {
      gameBoard[i].push(false);
    }
  }
  const center = Math.floor(width / 2);
  const leftBound = center - Math.floor(size / 2);
  const rightBound = leftBound + size;

  for (let i = leftBound; i < rightBound; i++) {
    gameBoard[height - 1][i] = true;
  }
  return gameBoard;
}

function moveDots(field, activeRow, direction, size) {
  const copy = _.cloneDeep(field);
  const row = copy[activeRow];

  let start = row.indexOf(true);
  let end = start + size - 1;
  if (direction === "left") {
    row[start - 1] = true;
    row[end] = false;
  } else {
    row[end + 1] = true;
    row[start] = false;
  }

  return copy;
}

function fillRow(field, activeRow, bonus, activeSize, intialSize) {
  if (activeRow === field.length - 2) {
    field[activeRow] = _.cloneDeep(field[activeRow + 1]);
    return field;
  } else {
    const newRow = determineMatch(field[activeRow + 1], field[activeRow + 2]);
    if (bonus === 5 && activeSize < intialSize) {
      const firstTrue = newRow.indexOf(true);
      const lastTrue = newRow.lastIndexOf(true);
      if (15 - firstTrue >= lastTrue) {
        newRow[lastTrue + 1] = true;
      } else {
        newRow[firstTrue - 1] = true;
      }
    }
    field[activeRow + 1] = newRow;
    field[activeRow] = _.cloneDeep(newRow);
    return field;
  }
}

function determineFullMatch(field, activeRow) {
  if (activeRow === field.length - 2) {
    return false;
  }
  return _.isEqual(field[activeRow + 1], field[activeRow + 2]);
}

function determineMatch(prevRow, secondRow) {
  return prevRow.map((dot, idx) => {
    if (dot === true && dot === secondRow[idx]) {
      return true;
    }
    return false;
  });
}

function findSize(activeRow) {
  return activeRow.reduce((accum, val) => {
    return val ? (accum += 1) : accum;
  }, 0);
}
