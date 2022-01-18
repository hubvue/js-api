import pipe from 'lodash/fp/flow'
// 什么是函数组合
// 函数组合是将一个函数应用于另外一个函数的输出的过程
// 代数表示法： (f . g)(x) = f(g(x))

const g = (n: number ) => n + 1
const f = (n: number) => n * 2

// const doStuffBetter = (x: number) => f(g(x))

// console.log(doStuffBetter(20))


// 原始函数
// const doStuff = (x: number) => {
//   const afterG = g(x)
//   console.log(`after g: ${afterG}`)
//   const afterF = f(afterG)
//   console.log(`after f: ${afterF}`)
// }
// doStuff(20)

// 抽象：输出
const trace = (label: string) => (value: number) => {
  console.log(`${label}: ${value}`)
  return value
}
// const doStuff = (x: number) => {
//   const afterG = g(x)
//   trace('after g')(afterG)
//   const afterF = f(afterG)
//   trace('after f')(afterF)
// }
// doStuff(20)
// 抽象：管道
const myPipe = (...fns: Function[]) => (x: number) => fns.reduce((y, f) => f(y), x)
const compose = (...fns: Function[]) => fns.reduce((f, g) => (x: number) => f(g(x)))
const doStuffBetter = compose(g, f)
// console.log(doStuffBetter(20))

// 在不提及参数的情况下编写函数称为无点风格，无点风格可以降低函数不必要的复杂性


// 组合对象
const firstName = 'kim'
const lastName = 'kimm'
const fullName = {
  firstName,
  lastName
}
console.log(fullName)