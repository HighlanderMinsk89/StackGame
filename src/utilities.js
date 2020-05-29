import _ from "lodash";

export const getUser = () => JSON.parse(localStorage.getItem("user"));

const getUserCountry = async () => {
  try {
    let response = await fetch("https://ipapi.co/json/");
    let data = await response.json();
    return { city: data.city, country: data.country_name };
  } catch (error) {
    console.error(error);
  }
};

export const setUserLS = async (userName) => {
  const { city, country } = await getUserCountry();
  const newUser = { name: userName, country, city };
  localStorage.setItem("user", JSON.stringify(newUser));
};

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
  speed: 0,
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
  return currentBonus >= 5 ? 1 : currentBonus + 1;
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
  prevRow.map((dot, idx) => dot === true && dot === secondRow[idx]);

export const findSize = (activeRow) =>
  activeRow.reduce((accum, val) => (val ? (accum += 1) : accum), 0);

export const calculateAndSaveResults = (fetchedResults, currentResult) => {
  let rank;
  let newLeaderBoard = fetchedResults || [];
  newLeaderBoard = newLeaderBoard.slice(0, 100);
  const slicedField = currentResult.field.slice(-currentResult.totalFloors);
  const newRecord = {
    totalFloors: currentResult.totalFloors,
    field: slicedField,
    user: currentResult.user,
  };

  if (
    newLeaderBoard.length >= 100 &&
    newLeaderBoard[newLeaderBoard.length - 1].totalFloors >=
      newRecord.totalFloors
  ) {
    const top3 = newLeaderBoard.slice(0, 3);
    return { rank: false, top3, newRecord };
  }

  newLeaderBoard.push(newRecord);
  newLeaderBoard.sort((a, b) => b.totalFloors - a.totalFloors);
  rank = newLeaderBoard.indexOf(newRecord) + 1;
  fetch("https://stack-it-73fd3.firebaseio.com/records.json", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newLeaderBoard),
  })
    .then((res) => res.json())
    .catch((err) => console.error("Error", err));

  const top3 = newLeaderBoard.slice(0, 3);
  return { rank, top3, newRecord };
};

export const generateResultMessage = (rank) => {
  if (!rank) {
    return ":( You Are Not in TOP 100. Proove You Can Do Better!";
  } else if (rank === 1) {
    return "WOW! A New CHAMPION Is Here! Congratulations!";
  } else if (rank === 2 || rank === 3) {
    return "TOP 3 in the World! Nicely Done!";
  } else if (rank > 3 && rank <= 10) {
    return "Good Job! So Close to TOP 3!";
  } else if (rank > 10 && rank <= 50) {
    return "You Are in TOP 50! Well Done!";
  } else {
    return "TOP 100! All Construction Companies Are Proud of You!";
  }
};
