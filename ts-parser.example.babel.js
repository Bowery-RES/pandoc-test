/* eslint-disable no-template-curly-in-string */

class TSParser {
  constructor(ts) {
    this.stat = [];
    this.interp = [];
    this.ts = ts;

    this.fragments = this.ts.split(/\$\{(.*?)\}/);

    this.fragments.forEach((fragment, i) => {
      if ((i % 2) === 0) {
        this.stat.push(fragment);
      } else {
        this.interp.push(fragment);
      }
    });
  }

  render(input) {
    const output = [];
    this.fragments.forEach((fragment, i) => {
      if ((i % 2) === 0) {
        output.push(fragment);
      } else {
        output.push(input[fragment] || '[[ERROR]]');
      }
    });
    return output.join('');
  }
}

const buildingDescFragment = 'a 5-story, walk-up, multi-family building';
const totalUnitsFragment = '18 residential units';

const input = { buildingDescFragment, totalUnitsFragment };

const templateStringDefault =
  'The subject consists of ${buildingDescFragment} totaling ${totalUnitsFragment}.';

const templateString1 =
  'The subject consists of ${buildingDescFragment}. It has ${totalUnitsFragment}.';

const templateString2 =
  'The subject is ${buildingDescFragment} with ${totalUnitsFragment}.';

const testTS1 = new TSParser(templateStringDefault);
const testTS2 = new TSParser(templateString1);
const testTS3 = new TSParser(templateString2);

const tests = [testTS1, testTS2, testTS3];

tests.forEach(test => console.log(test.render(input)));
