
Function.prototype.newBind = function(obj, ...args1) {
      obj = obj || window;
      let _self = this;
      let temp = function(){};
      let fn =  function(...args2) {
            return _self.apply(this instanceof temp ? this : obj,args1.concat(args2));
      }
      temp.prototype = this.prototype;
      fn.prototype = new temp();
      return fn;
}

const obj = {
      name: "wang"
}

function test (name ,age) {
      this.name = name;
      this.age = age;
}

let fn = test.newBind(obj, 'chong');
fn(22);
console.log(fn);
console.log(obj)

let obj2 = new fn(23);
console.log(obj2);