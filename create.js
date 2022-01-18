function create(proto) {
      let obj = {};
      // obj.__proto__ = proto;
      Object.setPrototypeOf(obj, proto);
      return obj;
}

const obj = {
      name: "123"
}
const result = create(obj);
console.log(result.name);