// const promise = new Promise((resolve, reject) => {
//       resolve(1);
// })

Promise.prototype.newFinally = function(callback) {
  let P = this.constructor
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reson =>
      P.resolve(callback()).then(() => {
        throw reson
      })
  )
}
// promise.then(x => {
//       console.log(1)
// }).catch(e => {
//       console.log(2);
// }).newFinally(c => {
//       console.log(3);
// })

// const fromArray = arr => {
//       arr = arr.sort((a,b) => a - b);
//       arr = [...new Set(arr)];
//       let tag = 1, len = arr.length, i =0,result = [], temp = [];
//       while(i < len) {
//             debugger;
//             if(arr[i] / 10 < tag) {
//                   temp.push(arr[i]);
//                   i++;
//             } else {
//                   tag ++;
//                   result.push(temp);
//                   temp = [];
//             }
//       }
//       if(temp.length) {
//             result.push(temp);
//       }
//       return result;
// }

// const arr = [2, 10, 3, 4, 5, 11, 10, 11, 20];

// const result = fromArray(arr);
// console.log(result);

// const find = (S, T) => {
//       if(S.length < T.length) {
//             return -1;
//       }
//       debugger;
//       for(let i = 0; i< S.length - (T.length -1 ); i ++) {
//             console.log(S.slice(i, T.length + i), i, T.length - 1, S,T);
//             if(S.slice(i, T.length + i) === T) {
//                   return i;
//             }
//       }
//       return -1;
// }

// const result = find('abcdef','de');
// console.log(result);

// const reverseArr = arr => k => {
//       while(k > 0) {
//             arr.unshift(arr.pop());
//             k --;
//       }
//       return arr;
// }
// const arr = [1, 2, 3, 4, 5, 6, 7];
// const result = reverseArr(arr)(3);
// console.log(result);

// const trans0 = arr => {
//       let len = arr.length;
//       for(let i = 0; i < len; i ++) {
//             if(arr[i] === 0) {
//                   let item = arr.splice(i,1);
//                   arr = arr.concat(item);
//             }
//       }
//       return arr;
// }

// const arr = [0,1,0,3,12];
// const result = trans0(arr);
// console.log(result);

const curring = (fn, len = fn.length) => {
  len = len || fn.length
  return (...args) =>
    args.length >= len
      ? fn.apply(this, args)
      : curring(fn.bind(this, ...args), len - args.length)
}

let a = {
  i: 1,
  [Symbol.toPrimitive]() {
    return a.i++
  }
}

if ((a == 1 && a == 2) || a == 3) {
  console.log('123')
}
