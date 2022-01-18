
function debounce(fn,time) {
      let timeout = null;
      return function(...args){
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                  fn.apply(this, args);
            },time)
      }
}
