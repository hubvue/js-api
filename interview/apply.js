Function.prototype.myApply = function(obj, args) {
  obj = obj || window
  if (!Array.isArray(args)) {
    throw new Error('arguments is not Array')
  }
  obj['fn'] = this
  let result = obj.fn(...args)
  delete obj.fn
  return result
}

function test(age) {
  console.log(this.name)
  this.age = age
}
let obj = {
  name: 123
}
test.myApply(obj, [2])
console.log(obj)
