const myInstanceof = (target, origin) => {
  while (target) {
    if (target.__proto__ === origin.prototype) {
      return true
    }
    target = target.__proto__
  }
  return false
}

console.log(myInstanceof([], Object))

//原始值的instanceof
class PrimitiveString {
  static [Symbol.hasInstance](x) {
    return typeof x === 'string'
  }
}

const primitive = trye => {
  return class {
    static [Symbol.hasInstance](value) {
      return typeof value === trye
    }
  }
}
const primitiveString = primitive('string')
const primitiveNumber = primitive('number')
console.log('123' instanceof primitiveString)
console.log(123 instanceof primitiveNumber)
