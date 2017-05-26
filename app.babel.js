import schemas from './input.schema';

const dependencies = [
  'floors',
  'elevator',
];

const reportSchema = { };

dependencies.forEach((dependency) => {
  reportSchema[dependency] = schemas[dependency];
});

console.log(reportSchema.toString());
