//类型转换的三种情况
// 1、转换为boolean值
// 2、转换为数字
// 3、转换为字符串

// number 转 boolean  除了 0 -0 NaN都为true
// string 转 boolean 除了空串 都为true
// undefined null 转 boolean  都为false
// 引用类型 转boolean 都为true
// number 转 string  5 =》 ‘5’
// boolean 转 string true =》 ‘true’ false =》 ‘false’
// [] 转 string  [1.2.3] => '1,2,3'
// object 转 string '[object Object]'
// string 转 number '1' => '1' 'a' => NaN
//  [] 转 number  空数组为0，存在一个元素且为数字转成数字，其它情况NaN
// null 转 number 0
// 除了数组的引用类型 转 number NaN
// Symbol 转 number 报错

// 转boolean
// 在条件判断时，除了undefined、null、false、NaN、''、0、-0,其它值都为true，包括对象

//对象转原始类型
// 对象在转换类型的时候，会调用内置的[[ToPrimitive]]函数，对于这个函数来说，算法逻辑一般来说如下：
// 1、如果已经是原始类型了，那就不需要转换了
// 2、如果需要转字符串类型就调用x.toString(),转换为基础类型的话就返回转换的值。不是字符串类型的话就先调用valueOf方法，结果不是基础类型的话再调用toString

// [[ToPrimitive]]函数可以通过Symbol.toPrimitive方法重写
let a = {
  valueOf() {
    return 0
  },
  toString() {
    return '1'
  },
  [Symbol.toPrimitive]() {
    return 2
  }
}
console.log(String(a) + '')

// 四则运算符
// 加法
// 1、运算中其中一方为字符串，那么就会把另一方也转换为字符串
// 2、如果一方不是字符串或数字，那么会将它转为数字湖畔这字符串

// 比较运算符
// 1、如果是对象，就通过toPrimitive转换
// 2、如果是字符串，就通过unicode字符索引来比较

// == 判断的类型转换
// 1、首先会判断两者类型是否相同，相同的话就比大小了
// 2、类型不相同的话，就会进行类型转换
// 3、判断两者是否在对比null和undefined，是的话就返回true
// 4、判断二者类型是否为string和number，是的话就会将string转换成number
// 5、判断其中一方是否为boolean，是的话就会把boolean转为number
// 6、判断其中一方是否为object且另一方为string、number、或者symbol，是的话就会把object转为原始类型再进行判断
