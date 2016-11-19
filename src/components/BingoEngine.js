import _ from 'lodash';

const createBingoCard = (bingoCellValues, renderRow, renderColumn) => {
  const rowsCount = bingoCellValues.length;
  const columnsCount = bingoCellValues[0].length;
  const rows = [];
  for (let rowNum = 0; rowNum < rowsCount; rowNum++) {
    const columns = [];

    for (let columnNum = 0; columnNum < columnsCount; columnNum++) {
      columns.push(renderColumn(rowNum, columnNum));
    }
    rows.push(renderRow(rowNum, columns));
  }

  return rows;
};

const bingoCellValues = () => bingoCellValuesUS();

const bingoCellValuesUS = () => {
  const cellValues = [];
  const rules = usaRules();
  const columns = [[], [], [], [], []];

  // header
  cellValues.push(['B', 'I', 'N', 'G', 'O']);

  for (let rowNum = 1; rowNum < 6; rowNum++) {
    const row = [];
    let aRandomNumber = 0;

    for (let columnNum = 0; columnNum < 5; columnNum++) {
      // each column will need to show 5 unique number.
      // 5 random unique numbers range 1 - 15 on column 1 or B,
      // 5x 16-30 on column 2 or C and so on.
      // chunk of code inside while loop go thru each array element
      // and make sure that there won't be a duplicate number inside
      // each column.
      while (columns[columnNum].length < rowNum) {
        aRandomNumber = _.random(rules[columnNum][0], rules[columnNum][1]);
        // if (columns[columnNum].indexOf(aRandomNumber) > -1) continue;
        if (columns[columnNum].indexOf(aRandomNumber) === -1) {
          row.push(aRandomNumber);
          columns[columnNum].push(aRandomNumber);
        }
      }
    }
    cellValues.push(row);
  }

  // middle cell is a gimme
  cellValues[3][2] = 'FREE';

  return cellValues;
};

const randomBingoBall = (bingoBalls) => randomBingoBallUS(bingoBalls);

const randomBingoBallUS = (bingoBalls) => {
  const ballCount = bingoBalls.length + 1;
  let aRandomNumber = 0;
  while (bingoBalls.length < ballCount) {
    aRandomNumber = _.random(1, 75);
    if (bingoBalls.indexOf(aRandomNumber) === -1) {
      return aRandomNumber;
    }
  }
};

const bingoCheck = (cellValues, cellStatus, rowNum, columnNum) => {
  const rowCount = cellValues.length;
  // check horizontal
  if (cellStatus[rowNum].indexOf(0) === -1) return true;

  // check vertical
  let verticalCount = 0;
  for (let row = 1; row < rowCount; row++) {
    if (cellStatus[row][columnNum] === 1) verticalCount++;
  }
  if (verticalCount === cellValues[rowNum].length) return true;

  // check diagonal
  let diagonalUpDownCounter = 0;
  let diagonalDownUpCounter = 0;
  let columnUpDown = 0;
  for (let row = 1; row < rowCount; row++) {
    if (cellStatus[row][columnUpDown] === 1) diagonalUpDownCounter++;
    if (cellStatus[rowCount - row][columnUpDown] === 1) diagonalDownUpCounter++;
    columnUpDown++;
  }

  if ((diagonalUpDownCounter === rowCount - 1) 
    || (diagonalDownUpCounter === rowCount - 1)) return true;

  return false;
};

const usaRules = () => [
  [1, 15],
  [16, 30],
  [31, 45],
  [46, 60],
  [61, 75]
];


const bingoCellStatusInit = () =>
  [
    [-1, -1, -1, -1, -1],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ];

export { createBingoCard, bingoCellValues, bingoCellStatusInit, bingoCheck, randomBingoBall };
