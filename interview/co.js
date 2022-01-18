function co(it) {
  return new Promise((resolve, reject) => {
    function next(data) {
      try {
        var { value, done } = it.next(data)
      } catch (err) {
        reject(err)
      }
      if (!done) {
        Promise.resolve(value).then(val => {
          next(val)
        })
      } else {
        resolve(value)
      }
    }
    next()
  })
}

function* test() {
  yield Promise.resolve(1).then(val => console.log(val))
  yield Promise.resolve(2).then(val => console.log(val))
  yield Promise.resolve(3).then(val => console.log(val))
  yield Promise.resolve(4).then(val => console.log(val))
}

co(test())

function co(it) {
  return new Promise((resolve, reject) => {
    function next(data) {
      try {
        var { value, done } = it.next(data)
      } catch (err) {
        reject(err)
      }
      if (done) {
        resolve(value)
      } else {
        Promise.resolve(value).then(value => next(value))
      }
    }
    next()
  })
}
