

/***  FUNCTION DECORATORS  */
// Implementation of spy function to record all the function calls
export const spy = (func) => {
    const wrapper = (...args) => {
      wrapper.calls.push('call:' + [].join.call(args));
      func.apply(this, args);
    }
    wrapper.calls = [];
    return wrapper;
}

// implementation of debounce

export const debounce = (fn, delay) => {
  let sleeping = true;
  return (...args) => {
    if(!sleeping) return fn.apply(this, args);
    sleeping = false;
    setTimeout(() => sleeping = true, delay);
  }
}

const myFun = () => console.log('myFun Called');
const newMyFun = debounce(myFun, 1000);

newMyFun(10);
setTimeout(newMyFun, 1100);
setTimeout(newMyFun, 1200);

// impkementation of throttle

export const throttle = (fn, delay) => {

  let savedContext;
  let savedArgs;
  let isThrottled = false;

  let wrapper = (...args) => {
      if(isThrottled) {
        savedContext = this;
        savedArgs = args;
        return;
      }

      fn.apply(this, args);
      isThrottled = true;

      setTimeout(() => {
        isThrottled = false;
        if(savedArgs) {
          fn.apply(savedContext, savedArgs);
          savedContext = savedArgs = null;
        }
      });
  }
  return wrapper;
}

const tt = arg => console.log('called with ' + arg);
const fn101 = throttle(tt , 1000);
fn101(1);
fn101(2);
fn101(3);
fn101(4);


//Data transform test

const players = [
  { name: 'Kohli', skill: 'Cricket' },
  { name: 'PV Sindhu', skill: 'Badminton' },
  { name: 'Sina', skill: 'Badminton' },
  { name: 'Kohli', skill: 'Chess' },
  { name: 'Sina', skill: 'Basket Ball' }
];

// Segrigate playes by skill

const newPlayers = (() => {
  const playersMap = players.reduce((acc, item) => {
    //console.log(acc);
    if(acc[item.name]) {
      acc[item.name].skill = [].concat(acc[item.name].skill, [item.skill])
    }
    else {
      acc[item.name] = item
    }
    return acc;
  }, {});
  return Object.keys(playersMap).map( key => playersMap[key] );
})()

//console.log(JSON.stringify(newPlayers));

// Output
/**
 * [
  {"name": "Kohli","skill": ["Cricket", "Chess"] }, 
  { "name": "PV Sindhu", "skill": "Badminton" }, 
  { "name": "Sina", "skill": ["Badminton", "Basket Ball"] }
]
 */
