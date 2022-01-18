Promise.myAll = function(promises) {
  return new Promise((resolve, reject) => {
    debugger;
    if(typeof promises[Symbol.iterator] !== 'function') {
      reject('error')
    }
    if(promises.length === 0) {
      resolve([]);
    }
    let index = 0;
    let resolveResult = []
    for(let p of promises) {
      p.then(x => {
        index ++;
        resolveResult.push(x);
        if(index === promises.length) {
          resolve(resolveResult);
        }
      },e => {
        reject(e);
        return;
      })
    }

  }) 
}
const p1 = new Promise((resolve,reject) => {
  resolve(1);
}).then(x => {
  console.log(x);
})
const p2 = new Promise((resolve,reject) => {
  resolve(2);
}).then(x => {
  console.log(x);
})
const p3 = new Promise((resolve,reject) => {
  resolve(3);
}).then(x => {
  console.log(x);
})
const p4 = new Promise((resolve,reject) => {
  resolve(4);
}).then(x => {
  console.log(x);
})
const result = Promise.myAll([p1,p2,p3,p4]).then(x => {
  console.log(x);
})
console.log(result);
