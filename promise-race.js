Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    debugger;
    if (typeof promises[Symbol.iterator] !== 'function') {
      reject('args is not iterator')
    }
    if (promises.length === 0) {
      return;
    }
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then((data) => {
        resolve(data);
        return;
      }, (err) => {
        reject(err);
        return;
      })
    }
  })
}

Promise.myRace([
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(100)
    }, 3000)
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(200)
    }, 2000)
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(300)
    }, 1000)
  })
]).then((data) => {
  console.log("123", data);
}, (err) => {
  console.log('3345', err);
});