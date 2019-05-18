import _ from 'lodash';
import * as utilities from './utilities';

console.log(`Nijou: ${utilities.Nijou(2)}, NAME: ${utilities.NAME}`);

function component() {
  const element = document.createElement('div');
  const array = ['Hello', 'Webpack', '!!'];
  element.innerHTML = _.join(array, ' ');
  return element;
}

document.body.appendChild(component());
