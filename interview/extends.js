//寄生组合式继承
const inhert = (function() {
  let F = function() {}
  return function(origin, target) {
    F.prototype = origin.prototype
    target.prototype = new F()
    target.prototype.constructor = target
    target.prototype.super = origin
    return target
  }
})()

//
