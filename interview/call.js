Function.prototype.myCall = function(obj, ...args) {
  obj = obj || window
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
test.myCall(obj, 1)
console.log(obj)
