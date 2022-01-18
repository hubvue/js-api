function myNew(target, ...args) {
  let obj = Object.create(target.prototype)
  let result = target.apply(obj, args)
  return (typeof result === 'object' && result) || typeof result === 'function'
    ? result
    : obj
}

function Person(name, age) {
  this.name = name
  this.age = age
}
const obj = myNew(Person, 'wang', 21)

console.log(obj)
