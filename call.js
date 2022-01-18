
Function.prototype.newCall = function (obj,...args) {
      if(!obj) {
            obj = window;
      }
      obj['fn'] = this;
      let result = obj.fn(...args);
      delete obj.fn
      return result;
}

const obj = {
      name: "Hello"
}

function test(name) {
      this.name = name;
}
test.newCall(obj,'word');
console.log(obj);