function test () {
      console.log("test");
      return 'aop'
}

Function.prototype.before = function(fn, ...args) {
      let _self = this;
      return function(...args1) {
            let beforeResult = fn.apply(this, args1);
            return beforeResult === false ? beforeResult : _self.apply(this, args);
      }
}

Function.prototype.after = function(fn, ...args) {
      let _self = this;
      return function (...args1) {
            let result = _self.apply(this, args);
            if(result === false) {
                  return false;
            }
            fn.apply(this, args1);
            return result;
      }
}

let result = test.before(() => {
      console.log('before')
      return false;
}).after(() => {
      console.log('after');
})()

console.log(result);
