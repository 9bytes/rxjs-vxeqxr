import { of } from 'rxjs'; 
import { map } from 'rxjs/operators';
import { spy } from './ricipies';


const source = of(1, 2, 3 ).pipe(
  map(x => `Hello ${x}!`)
);

source.subscribe(x => console.log(x));

const myObj = {
  one: 1,
  two: 2
};

myObj['three'] = 3;
const symbolFour = Symbol('four');
myObj[symbolFour] = 4;

console.log(Object.keys(myObj))
for (let p in myObj) {
//  console.log(p)
}

//console.log(myObj[symbolFour]);

function sum(a,b) {
  return a + b;
} 
const spySum = spy(sum);
spySum(10, 20);
spySum(20, 20);

//console.log(spySum['calls'])

