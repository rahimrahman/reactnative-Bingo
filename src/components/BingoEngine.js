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

const bingoCellValues = () => {
  return bingoCellValuesUS();
};

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
        if (columns[columnNum].indexOf(aRandomNumber) > -1) continue;
        row.push(aRandomNumber);
        columns[columnNum].push(aRandomNumber);
      }
    }
    cellValues.push(row);
  }

  cellValues[3][2] = 'FREE';

  return cellValues;
};

const usaRules = () => {
  return [
    [1, 15],
    [16, 30],
    [31, 45],
    [46, 60],
    [61, 75]
  ];
};


const initCellStatus = () =>
  [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ];

export { createBingoCard, bingoCellValues, initCellStatus };

