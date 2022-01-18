function my_co(it) {
  return new Promise((resolve, reject) => {
    function next(data){
      try {
        var {value, done} = it.next(data);
      } catch(e) {
        reject(e);
      }
      if(!done) {
          Promise.resolve(value).then(val => {
            next(val);
          })
      } else {
        resolve(value)
      }
    }
    next()
  })
}

function *test () {
  yield Promise.resolve(1).then(x => console.log(x));
  yield Promise.resolve(2).then(x => console.log(x));
  yield Promise.resolve(3).then(x => console.log(x));
  yield Promise.resolve(4).then(x => console.log(x));
}
my_co(test());