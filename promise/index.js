const PENDING = 'PENGIND'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

function MyPromise(fn) {
      const that = this;
      that.value = null;
      that.state = PENDING;
      that.resolveCallback = [];
      that.rejectCallback = []

      function resolve(value) {
            if(value instanceof MyPromise) {
                  return value.then(resolve, reject)
            }
            setTimeout(() => {
                  if (that.state === PENDING) {
                        that.state = RESOLVED;
                        that.value = value;
                        that.resolveCallback.forEach(cb => cb(that.value));
                  }
            }, 0)
      }

      function reject(value) {
            setTimeout(() => {
                  if (that.state === PENDING) {
                        that.state = REJECTED;
                        that.value = value;
                        that.rejectCallback.forEach(cb => cb(that.value));
                  }
            })
      }
      try {
            fn.call(that, resolve, reject);
      } catch (err) {
            reject(err);
      }
}

MyPromise.prototype.then = function (onFullfiled, onRejected) {
      const that = this;
      let pormise2;
      onFullfiled = typeof onFullfiled === 'function' ? onFullfiled : x => x;
      onRejected = typeof onRejected === 'function' ? onRejected : e => {
            throw e
      };
      if (that.state === PENDING) {
            return promise2 = new MyPromise((resolve, reject) => {
                  that.resolveCallback.push(function () {
                        try {
                              let result = onFullfiled(that.value);
                              resolve(result);
                        } catch (e) {
                              reject(e);
                        }
                  });
                  that.rejectCallback.push(function () {
                        try {
                              let result = onRejected(that.value);
                              resolve(result);
                        } catch (e) {
                              reject(e);
                        }
                  })
            });
      }
      if (that.state === RESOLVED) {
            return promise2 = new MyPromise((resolve, reject) => {
                  try {
                        let result = onFullfiled(that.value);
                        resolve(result);
                  } catch (e) {
                        reject(e);
                  }
            })
      }
      if (that.state === REJECTED) {
            return promise2 = new MyPromise((resolve, reject) => {
                  try {
                        let result = onRejected(that.value);
                        resolve(result);
                  } catch (e) {
                        reject(e);
                  }
            })
      }
}


const promise = new MyPromise((resolve, reject) => {
      // setTimeout(() => {
      resolve(1);
      // },200)
})
// console.log(2);

let result = promise.then(x => {
      console.log(x);
      console.log(1);
      return 3;
}).then(x => console.log(x));
console.log(result);

// console.log(3);

// const promise1 = new Promise((resolve, reject) => {
//       setTimeout(() => {
//             resolve(1);
//       },200)
// })
// promise.then(v => console.log(1));
// promise.then(v => console.log(2));
// promise.then(v => console.log(3));
// promise.then(v => console.log(4));


// promise1.then(x => {
//       return 2;
// }).then(x => {
//       console.log('🍎',x);
// })