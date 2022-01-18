const currying = (fn, ...args) =>
  args.length < fn.length
    ? (...argss) => currying(fn.bind(null, ...args), ...argss)
    : fn(...args)

// const currying = (fn, ...args) => {
//   if (args.length < fn.length) {
//     return function(...argss) {
//       return currying(fn.bind(null, ...args), ...argss)
//     }
//   }
//   return fn(...args)
// }

const add = (a, b, c) => console.log(a, b, c)
a = currying(add)
a(1)(2)(3)
a(1, 2)(3)
a(1, 2, 3)
a(1)(2, 3)

const currying = (fn, ...args) =>
  args.length < fn.length
    ? (...argss) => currying(fn.bind(null, ...args), ...argss)
    : fn(...args)
