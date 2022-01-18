function test(...args) {
  console.log(args)
}

Function.prototype.before = function(cb) {
  let that = this
  return function(...args) {
    let result = cb()
    that.apply(that, args)
    return result
  }
}
Function.prototype.after = function(cb) {
  let that = this
  return function(...args) {
    let result = that.apply(that, args)
    if (typeof result === 'boolean' && !result) {
      return
    }
    cb()
  }
}
const result = test
  .before(() => {
    console.log('before')
    // return true
    return false
  })
  .after(() => {
    console.log('after')
  })('test', 1, 23, 4)

console.log(result)
