const fetch = require('node-fetch')
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
function MyPromise(fn) {
  if (typeof fn !== 'function') {
    throw new Error('param is not function')
  }
  let _self = this
  _self.status = PENDING
  _self.value = null
  _self.resolveCallback = []
  _self.rejectCallback = []

  function resolve(value) {
    if (value instanceof MyPromise) {
      return value.then(resolve, reject)
    }
    setTimeout(() => {
      _self.value = value
      _self.status = FULFILLED
      _self.resolveCallback.forEach(cb => cb(_self.value))
    })
  }
  function reject(value) {
    setTimeout(() => {
      _self.value = value
      _self.status = REJECTED
      _self.rejectCallback.forEach(cb => cb(_self.value))
    })
  }

  try {
    fn.call(this, resolve, reject)
  } catch (err) {
    reject(err)
  }
}
MyPromise.prototype.then = function(fulfillCb, rejecteCb) {
  let _self = this
  fulfillCb = typeof fulfillCb === 'function' ? fulfillCb : x => x
  rejecteCb =
    typeof rejecteCb === 'function'
      ? rejecteCb
      : e => {
          throw e
        }

  if (_self.status === PENDING) {
    return new MyPromise((resolve, reject) => {
      _self.resolveCallback.push(function() {
        try {
          let result = fulfillCb(_self.value)
          resolve(result)
        } catch (err) {
          reject(err)
        }
      })
      _self.rejectCallback.push(function() {
        try {
          let result = rejecteCb(_self.value)
          resolve(result)
        } catch (err) {
          reject(err)
        }
      })
    })
  }
  if (_self.status === FULFILLED) {
    return new MyPromise((resolve, reject) => {
      try {
        let result = fulfillCb(_self.value)
        resolve(result)
      } catch (err) {
        reject(err)
      }
    })
  }
  if (_self.status === REJECTED) {
    return new MyPromise((resolve, reject) => {
      try {
        let result = rejecteCb(_self.value)
        resolve(result)
      } catch (err) {
        reject(err)
      }
    })
  }
}

// 1、value是一个promise对象，直接返回
// 2、value是一个thenable，返回的promise跟随这个thenable对象
// 3、value是一个普通的对象，直接resolve这个值

MyPromise.resolve = function(value) {
  if (value instanceof MyPromise) {
    return value
  }
  return new MyPromise((resolve, reject) => {
    if (value && value.then && typeof value.then === 'function') {
      setTimeout(() => {
        value.then(resolve, reject)
      }, 0)
    } else {
      resolve(value)
    }
  })
}

// reject方法的参数会原封不动的作为返回promise的reson
MyPromise.reject = function(value) {
  return new MyPromise((resolve, reject) => {
    reject(value)
  })
}
// 借用then方法，resolve透传
MyPromise.prototype.catch = function(onRejected) {
  if (typeof onRejected !== 'function') {
    throw new Error('param is not function')
  }
  return this.then(x => x, onRejected)
}

//无论是resolve， 还是reject 都会走的一步
MyPromise.prototype.finally = function(callback) {
  if (typeof allback !== 'function') {
    throw new Error('param is not function')
  }
  return this.then(
    value => {
      return MyPromise.resolve(callback()).then(() => {
        return value
      })
    },
    err => {
      return MyPromise.resove(callback()).then(() => {
        return err
      })
    }
  )
}

// all方法并没有严格要求promise中必须都是promise实例
MyPromise.all = function(promises) {
  return new MyPromise((resolve, reject) => {
    if (typeof promises[Symbol.iterator] !== 'function') {
      reject('error')
    }
    if (promises.length === 0) {
      resolve([])
    }
    let result = []
    for (let p of promises) {
      MyPromise.resolve(p).then(
        value => {
          result.push(value)
          if (result.length === promises.length) {
            resolve(result)
          }
        },
        err => {
          reject(err)
        }
      )
    }
  })
}

//race方法并没有严格要求promise中必须都是promise实例
MyPromise.race = function(promises) {
  return new MyPromise((resolve, reject) => {
    if (typeof promises[Symbol.iterator] !== 'function') {
      reject('error')
    }
    if (promises.length === 0) {
      resolve()
    }
    for (let p of promises) {
      MyPromise.resolve(p).then(
        value => {
          resolve(value)
        },
        err => {
          reject(err)
        }
      )
    }
  })
}
// 1、接收一组Promise实例作为参数，返回一个新的promise实例
// 2、只有当所有的参数实例都有结果的时候才返回，无论是fulfilled还是rejected，
// 3、返回的数据是一个这样的数据结构 [{status: 'fulfilled', value: 1}, {status: 'rejected', reson: 2}]
MyPromise.allSettled = function(promises) {
  return new MyPromise((resolve, reject) => {
    if (typeof promises[Symbol.iterator] !== 'function') {
      reject('error')
    }
    if (promises.length === 0) {
      resolve([])
    }
    let result = []
    let idx = 0
    for (let p of promises) {
      MyPromise.resolve(p).then(
        value => {
          result.push({
            status: 'fulfilled',
            value
          })
          idx++
          if (idx === promises.length) {
            resolve(result)
          }
        },
        reson => {
          result.push({
            status: 'rejected',
            reson
          })
          idx++
          if (idx === promises.length) {
            resolve(result)
          }
        }
      )
    }
  })
}

//Promise.any类似于race，唯一不同的是，只有当所有的实例都rejected的时候any才会返回rejected，只要有一个实例fulfilled，any就会返回fullfiled
MyPromise.any = function(promises) {
  return new MyPromise((resolve, reject) => {
    if (typeof promises[Symbol.iterator] !== 'function') {
      reject('error')
    }
    if (promises.length === 0) {
      resolve()
    }
    let resonArr = []
    for (let p of promises) {
      MyPromise.resolve(p).then(
        value => {
          resolve(value)
        },
        err => {
          resonArr.push(err)
          if (resonArr.length === promises.length) {
            reject(resonArr)
          }
        }
      )
    }
  })
}

const promises = [
  MyPromise.reject(1),
  MyPromise.resolve(1),
  MyPromise.reject(1)
]
;(async () => {
  try {
    const first = await MyPromise.any(promises)
    console.log(first)
  } catch (error) {
    console.log(error)
  }
})()

// const promises = [
//   MyPromise.resolve(1),
//   MyPromise.reject(2),
//   MyPromise.resolve(3),
//   MyPromise.reject(4),
//   MyPromise.resolve(5),
//   MyPromise.reject(6)
// ]
// const allSettledPromise = MyPromise.allSettled(promises)

// allSettledPromise.then(function(results) {
//   console.log(results)
// })
// const promise = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1)
//   }, 1000)
// })

// promise
//   .then(x => {
//     console.log(1)
//     return 3
//   })
//   .then(x => {
//     console.log(x)
//   })

// let p = new Promise((resolve, reject) => {
//   resolve()
// })
// console.log(3)
// Promise.reject(p).then(
//   x => {
//     console.log(1)
//   },
//   () => {
//     console.log(2)
//   }
// )
// console.log(4)

Promise.all([1, 2, 3]).then(x => {
  console.log(123, x)
})

console.log(Promise.any)
