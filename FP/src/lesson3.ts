// Lambda演算是一种基于函数应用的通用计算模型
// 有以下要点：
//  1、函数总是匿名的。在js中 const sum = (x, y) => x + y; 此时(x, y) => x + y就是匿名函数表达式
//  2、lambda演算中的函数只接受单个输出。他们是一元的。如果需要多个参数，改函数将接受一个输入并返回一个接受下一个人输入的新函数，以此类推。
//     这种从n元函数转为1元函数的过程叫做科里化
//  3、函数是一等的，意味着函数可以作为其他函数的输入，函数可以返回函数。


// 经典的函数组合从一个函数中获取输出并将其用作另一个函数的输入。例如：
// F · G
// 可以写成
const compose2 = (f: Function) => (g: Function) => <T>(x: T) => f(g(x))
const double = (n: number) => n * 2
const inc = (n: number) => n + 1
console.log(compose2(double)(inc)(3))