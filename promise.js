const PENDING = 'PENGIND'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

function MyPromise(fn) {
  let that = this
  that.state = PENDING
  that.value = null
  that.resolvedCallback = []
  that.rejectedCallback = []

  function resolve(val) {
    if (val instanceof MyPromise) {
      return val.then(resolve, reject)
    }
    setTimeout(() => {
      if (that.state === PENDING) {
        that.value = val
        that.state = RESOLVED
        that.resolvedCallback.forEach(cb => cb(that.value))
      }
    }, 0)
  }

  function reject(err) {
    setTimeout(() => {
      if (that.state === REJECTED) {
        that.state = REJECTED
        that.value = err
        that.rejectedCallback.forEach(cb => cb(that.value))
      }
    }, 0)
  }

  try {
    fn.call(this, resolve, reject)
  } catch (e) {
    reject(e)
  }
}
MyPromise.prototype.then = function(onFulfiled, onRejected) {
  let that = this
  let promise2
  // 透传
  onFulfiled = typeof onFulfiled === 'function' ? onFulfiled : x => x
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : r => {
          throw r
        }

  if (that.state === PENDING) {
    return (promise2 = new MyPromise((resolve, reject) => {
      that.resolvedCallback.push(function() {
        try {
          var x = onFulfiled(that.value)
          resolve(x)
        } catch (e) {
          reject(e)
        }
      })
      that.rejectedCallback.push(function() {
        try {
          var x = onRejected(that.value)
          resolve(x)
        } catch (e) {
          reject(e)
        }
      })
    }))
  }
  if (that.state === RESOLVED) {
    return (promise2 = new MyPromise((resolve, reject) => {
      try {
        let x = onFulfiled(that.value)
        resolve(x)
      } catch (e) {
        reject(e)
      }
    }))
  }
  if (that.state === REJECTED) {
    return (promise2 = new MyPromise((resolve, reject) => {
      try {
        let x = onFulfiled(that.value)
        // Promise解决过程
        // resolutionProcedure(promise2, x, resolve, reject)
        resolve(x)
      } catch (e) {
        reject(e)
      }
    }))
  }
}

// const myPromise = new MyPromise((resolve, reject) => {
//       console.log(1)
//       setTimeout(() => {
//             resolve(2)
//       },2000)
// })
// myPromise.then(x => {
//       console.log(x);
//       return 3;
// }).then(x => {
//       console.log(x);
// })

const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  })
})

promise
  .then(x => {
    console.log(1)
    return 3
  })
  .then(x => {
    console.log(x)
  })
// promise.then(x => {
//       console.log(1);
// })
// promise.then(x => {
//       console.log(1);
// })
// promise.then(x => {
//       console.log(1);
// })
