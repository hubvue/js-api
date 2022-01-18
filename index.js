import index from './BFSdeepClone'

function sayHi() {
  console.log('Hello,', this.name)
}

var person1 = {
  name: 'YvetteLau',
  sayHi: function() {
    setTimeout(function() {
      this.a = 123
      console.log('Hello,', this.name)
    })
  }
}
var person2 = {
  name: 'Christina',
  sayHi: sayHi
}
var name = 'Wiliam'
person1.sayHi() //main
setTimeout(person2.sayHi, 100)

setTimeout(function() {
  person2.sayHi()
}, 200)

function a(value) {
  return function b(value1) {}
}

const a = value => value1 => {}
// onClick={a(1)}
