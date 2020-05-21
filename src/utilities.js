import _ from "lodash";

export const makeStartBoard = (height, width, size) => {
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
};

export const defaultState = {
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

export const sliceFieldPartToShow = (field) =>
  field.length >= 85 ? field.slice(35, 85) : field.slice(-50);

export const setSpeed = (totalFloors) => {
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

export const bonusCounter = (currentBonus, fullMatch) => {
  if (!fullMatch) return 0;
  else {
    if (currentBonus >= 5) return 1;
    else return currentBonus + 1;
  }
};

export const moveDots = (field, activeRow, direction, size) => {
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
};

export const fillRow = (field, activeRow, bonus, activeSize, intialSize) => {
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
};

export const determineFullMatch = (field, activeRow) => {
  if (activeRow === field.length - 2) {
    return false;
  }
  return _.isEqual(field[activeRow + 1], field[activeRow + 2]);
};

export const determineMatch = (prevRow, secondRow) =>
  prevRow.map((dot, idx) => {
    if (dot === true && dot === secondRow[idx]) {
      return true;
    }
    return false;
  });

export const findSize = (activeRow) =>
  activeRow.reduce((accum, val) => {
    return val ? (accum += 1) : accum;
  }, 0);
