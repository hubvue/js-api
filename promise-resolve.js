// 实现promise.resolve
// 任何一个promise方法都会返回一个新的promise
// 1、如果参数是一个Promise，直接返回这个参数
// 2、如果参数是一个对象，并且带有then方法，那么这个then方法是异步的
// 3、其它情况直接resolve
Promise.myResolve = function (param) {
  if(param instanceof Promise) {
    return param;
  }
  return new Promise((resolve, reject) => {
    if(param && param.then && typeof param.then === 'function') {
      setTimeout(() => {
        resolve(param);
      })
    } else {
      resolve(param);
    }
  })
}

const p = Promise.myResolve({
  then: (resolve,reject) => {
    resolve(123);
  }
})
console.log(1);
p.then(data => {
  console.log(data);
})
console.log(2);
