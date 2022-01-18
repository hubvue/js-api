Function.prototype.myBind = function(target, ...args) {
  target = target || window
  let that = this
  let temp = function() {}
  let F = function(...args2) {
    return that.apply(this instanceof temp ? this : target, args.concat(args2))
  }
  temp.prototype = this.prototype
  F.prototype = new temp()
  return F
}

const obj = {
  name: 'wang'
}

function test(name, age) {
  this.name = name
  this.age = age
}

let fn = test.myBind(obj, 'zhou')
fn(100)
console.log(obj)
const f = new fn(200)
console.log(f)
