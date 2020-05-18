import React, { Component } from 'react';
import Row from './Row';
import _ from 'lodash';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      activeRow: 49,
      activeSize: 9,
      totalFloors: 0,
      direction: 'left',
      field: makeStartBoard(50, 15, 9),
      score: 0,
      speed: 150,
    };

    this.interval = null;
  }

  componentDidMount() {
    document.body.onkeyup = (e) => {
      if (e.keyCode === 32) {
        if (!this.state.playing) {
          this.setState({ playing: true });
          this.tick();
        } else {
          this.setState({ activeRow: this.state.activeRow - 1 }, () => {
            const newField = fillRow(this.state.field, this.state.activeRow);
            this.setState({ field: newField }, () => {
              const newSize = findSize(this.state.field[this.state.activeRow]);
              this.setState({
                activeSize: newSize,
                totalFloors: this.state.totalFloors + 1,
              });
              if (
                this.state.totalFloors > 0 &&
                !(this.state.totalFloors % 10)
              ) {
                this.setState({ speed: this.state.speed - 20 }, () => {
                  clearInterval(this.interval);
                  this.interval = setInterval(
                    this.movingIntervalCallback.bind(this),
                    this.state.speed
                  );
                });
              }
            });
          });
        }
      }
    };
  }

  movingIntervalCallback() {
    if (this.state.field[this.state.activeRow][0]) {
      this.setState({ direction: 'right' });
    }
    if (
      this.state.field[this.state.activeRow][
        this.state.field[this.state.activeRow].length - 1
      ]
    ) {
      this.setState({ direction: 'left' });
    }
    const { field, activeRow, direction, activeSize } = this.state;
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
        <div className="cont">
          {this.state.field.map((el, idx) => {
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
        <h1 style={{ color: 'white', fontSize: '70px' }}>{this.state.score}</h1>
        <h1 style={{ color: 'white', fontSize: '70px' }}>
          {this.state.totalFloors} Floors
        </h1>
        <span>
          <h1 style={{ color: 'white', fontSize: '70px' }}>
            {this.state.speed}
          </h1>
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
  if (direction === 'left') {
    row[start - 1] = true;
    row[end] = false;
  } else {
    row[end + 1] = true;
    row[start] = false;
  }

  return copy;
}

function fillRow(field, activeRow) {
  if (activeRow === field.length - 2) {
    field[activeRow] = _.cloneDeep(field[activeRow + 1]);
    return field;
  } else {
    const newRow = determineMatch(field[activeRow + 1], field[activeRow + 2]);
    field[activeRow + 1] = newRow;
    field[activeRow] = _.cloneDeep(newRow);
    return field;
  }
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
