// function newClass(target, ...args) {
//       let obj = Object.create(target.prototype);
//       let result = target.apply(obj,args);
//       return (typeof result === 'object' && result) || typeof result === 'function' ? result : obj;
// }

// function test(name,age) {
//       this.name = name;
//       this.age = age;
//       return {} ;
// }
// let result = new test('name',22)

// let result = newClass(test, 'name',22);
// console.log(result);


// let a = Object.create(b);
// a.prototype === b  //true







console.log(a);
a = 123;
console.log(a);
function a() {
      console.log(123);
}
console.log(a);

