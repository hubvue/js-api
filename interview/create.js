function create(prototype) {
  var obj = {}
  obj.__proto__ = prototype
  return obj
}

let obj = {
  name: 'wang'
}
let o = create(obj)

console.log(o)
console.log(o.name)
