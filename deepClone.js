const deepClone = (target, num , map = new WeakMap(), level = 0) => {
  if(target instanceof RegExp) return new RegExp(target);
  if(target instanceof Date) return new Date(target);
  if(!num){
    num = level;
  }
  if(target === null || typeof target !== 'object' || level > num) {
    return target;
  }
  if(map.has(target)) {
    return map.get(target);
  }
  let t = new target.constructor();
  map.set(target, t);
  for(let key in target) {
    if(target.hasOwnProperty(key)) {
      t[key] = deepClone(target[key], map, level + 1);
    }
  }
  return t;
}

const a = {
  b: 1,
  c: [1,2,3],
  d: {
    e: 1
  },
  f: function(){console.log(1)},
  g: Symbol('g'),
  q: undefined,
  r: null
}
a.w = a;
const aa = deepClone(a,2);
aa.d.e = 123;
console.log(a);
console.log(aa);
