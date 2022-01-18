
function throttle(fn,time) {
      let frag = false;
      return function(...args) {
            if(farg) {
                  return;
            }
            frag = true;
            setTimeout(() => {
                  fn.apply(this, args);
            }, time)
      }
}