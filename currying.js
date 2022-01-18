const currying = (fn,...args) => {
   return args.length < fn.length ?  (...argss) => currying(fn.bind(this,...args),...argss) : fn(...args) 
}
let  a = (a,b,c) => console.log(a + b + c);
a = currying(a);
a(1)(2)(3);
a(1,2)(3);
a(1,2,3);