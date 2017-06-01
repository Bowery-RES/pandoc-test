import chalk from 'chalk';

// Input Data

import incomeLevelsData from './income-levels.data';

console.log(chalk.cyan('Income Levels Data'));
console.log(incomeLevelsData);

// Table Row Space Definition

const tableRows = incomeLevelsData.map(item => item.borough);

console.log(chalk.cyan('Table Rows'));
console.log(tableRows);

// Table Column Space Definition

const tableColumns = [
  'Borough Name',
  null,
  '2010 Census',
  '2017 Estimate',
  '% Change 2010 - 2017',
  '2022 Projected',
  '% Change 2017 - 2022',
];

console.log(chalk.cyan('Table Columns'));
console.log(tableColumns);


const percentChange = (past, present) => ((present - past) / past);

const table = {
  rows: [],
};

incomeLevelsData.forEach((data) => {
  const { borough } = data;

  const avg = {
    past: data[2010].avg,
    present: data[2017].avg,
    future: data[2022].avg,
  };

  const avgRow = Object.assign(avg, {
    presentChange: percentChange(avg.past, avg.present),
    futureChange: percentChange(avg.present, avg.future),
  });

  const med = {
    past: data[2010].med,
    present: data[2017].med,
    future: data[2022].med,
  };

  const medRow = Object.assign(med, {
    presentChange: percentChange(med.past, med.present),
    futureChange: percentChange(med.present, med.future),
  });

  const boroughRows = [
    { label: 'Average', columns: avgRow },
    { label: 'Median', columns: medRow },
  ];

  table.rows.push({
    label: borough,
    rows: boroughRows,
  });
});

console.log(chalk.cyan('Table Object'));
console.log(table);

console.log(chalk.cyan('Size of Row Space'));

let space = 0;

table.rows.forEach((tr) => {
  space += tr.rows.length;
});

console.log(space);
