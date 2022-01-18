const flat = arr => arr.reduce((a, b) => Array.isArray(b) ? a.concat(flat(b)) : a.concat([b]), []);
const unique = arr => [...new Set(arr)];
const sort = arr => arr.sort((a, b) => a - b);

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));


const flatten = function (arr) {
      debugger
      while (arr.some(item => Array.isArray(item))) {
            arr = [].concat(...arr)
      }
      return arr
}


var arr = [
      [1, 2, 2],
      [3, 4, 5, 5],
      [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10
];
const fn = compose(sort, unique, flat)
// const a = fn(1)



const flat1 = arr => {
      let result = arr.reduce((f,g) => {
            if(Array.isArray(g)){
                  return f.concat(flat(g));
            } else {
                  return f.concat([g])
            }
      }, [])
      return result
}
const result = flat1(arr);
console.log(result);


arr.reduce(function(a, b) {
      return a + b;
}, [])