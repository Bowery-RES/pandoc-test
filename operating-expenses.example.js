import chalk from 'chalk';
/* eslint-disable no-underscore-dangle */

import literallyTheAlphabet from './literally-the-alphabet';

const parseTableSpace = (arr) => {
  const exp = { };
  arr.forEach((item, i) => {
    exp[literallyTheAlphabet[i]] = item;
  });
  return exp;
};

const _taxInfo = {
  label: 'Real Estate Taxes',
  val: 56527,
};

const _operatingExpenses = [
  { label: 'Insurance', val: 5153 },
  { label: 'Electricity', val: 1374 },
  { label: 'Fuel', val: 6870 },
];

const _sqFt = 10000;

const _units = 10;

const operatingExpensesTableSchema = {
  service: (taxInfo, operatingExpenses, sqFt, units) => ({
    get value() {
      const columnLabels = ['Total', 'Per Square Foot', 'Per Unit'];

      // Format Rows:
      // [Operating Expense Items]
      // Total Operating Expenses
      // Total Expenses Excluding RE Taxes

      const expenseRows = [];

      operatingExpenses.unshift(taxInfo);

      operatingExpenses.forEach((expense) => {
        const { label, val } = expense;
        const vals = [];

        vals.push(val);
        vals.push(val / sqFt);
        vals.push(val / units);

        expenseRows.push({ label, vals });
      });

      const tSum = (cellSpace, index) => {
        let sum = 0;
        cellSpace.forEach((iter) => {
          sum += iter.vals[index];
        });
        return sum;
      };

      const totalExpenseVals = [];
      const totalExpenseExcTaxVals = [];

      columnLabels.forEach((label, i) => {
        const total = tSum(expenseRows, i);
        const tax = expenseRows[0].vals[i];

        totalExpenseVals.push(total);
        totalExpenseExcTaxVals.push(total - tax);
      });

      const totalExpenseRow = {
        label: 'Total Operating Expenses',
        vals: totalExpenseVals,
      };

      const totalExpenseExcTaxRow = {
        label: 'Total Expenses Excluding RE Taxes',
        vals: totalExpenseExcTaxVals,
      };

      return {
        expenseRows,
        totalExpenseRow,
        totalExpenseExcTaxRow,
      };
    },
  }),
};

const oeTable = operatingExpensesTableSchema
  .service(_taxInfo, _operatingExpenses, _sqFt, _units)
  .value;

console.log(oeTable);

Object.entries(oeTable).forEach((entry) => {
  const [key, val] = entry;
  console.log(chalk.cyan(key));
  if (val instanceof Array) {
    val.forEach((item) => {
      console.log(chalk.green(item.label), parseTableSpace(item.vals));
    });
  } else {
    console.log(chalk.green(val.label), parseTableSpace(val.vals));
  }
});
