// 为什么要学习JavaScript函数式编程？

// JavaScript具有函数式编程所需的最重要的特性：
//  1、函数是一等公民。将函数作用数据值的能力：将函数作为参数传递、返回函数以及将函数分配给变量和对象属性。
//     此属性允许使用高阶函数，从而实现部分应用、柯里化以及组合。
//  2、匿名函数和简介的lambda语法。x=>x * 2是JavaScript中有效的函数表达式。简介的lambda使使用高阶函数变的更容易。
//  3、闭包。闭包是函数与其词法环境的绑定。闭包是在函数创建时创建。

// 函数式语言具有但JavaScript缺少的特性：
//  1、纯度：在某些FP语言中，纯度是由语言强制执行的，不允许有副作用的表达式
//  2、不变性：一些FP语言禁用突变。表达式不是改变现有的数据结构，而是生成新的数据结构
//  3、递归：递归是函数为了迭代而引用自身的能力。在许多FP语言中，递归是唯一的迭代方式，没有像for、while的循环，JavaScript也同样支持递归的能力


// 纯度：在JavaScript中，纯度必须通过约定来实现。
// 不变性：在纯函数式语言中，经常强制执行不变性。JavaScript缺乏大多数函数式语言使用的高效、不可变的基于trie的数据结构，
//        但有一些库可以提供帮助，包括Immutable.js和Mori。也可以使用语言提供的const以及Object.freeze来使用数据不可变
// 递归：JavaScript在技术上支持递归，但大多数函数式语言都有一个成为尾调用优化的特性。
//       尾调用优化是一项功能，它允许递归函数为递归调用重用堆栈帧