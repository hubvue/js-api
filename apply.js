Function.prototype.newApply = function(obj, args) {
  obj = obj || window
  obj.fn = this
  let result = obj.fn(...args)
  delete obj.fn
  return result
}

function test(name, age) {
  this.name = name
  this.age = age
}

const obj = {
  name: 'wang'
}

test.newApply(obj, ['hello', 21])
console.log(obj)
