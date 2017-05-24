import chalk from 'chalk';
import nodePandoc from 'node-pandoc';

// const src = './input.docx';
const src = './simplified.md';

// const args = '-f docx -t markdown -o ./markdown.md';
const args = '-f markdown -t docx -o ./simplified.docx';

const cb = (err, result) => {
  if (err) console.log(chalk.red('#Fail'));

  return console.log(result), result;
}

nodePandoc(src, args, cb);
