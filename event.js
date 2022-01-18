class EventEmeitter {
  constructor(num) {
    this._events = this._events || new Map();
    this._maxListeners = this._maxListeners || num || 10;
  }
  emit(type, ...args) {
    if(!this._events.has(type)) {
      return null;
    } 
    let handles = this._events.get(type);
    handles.forEach(fn => fn.apply(null, args));
    return true;
  }
  add(type, fn) {
    let handles ;
    if(typeof fn !== 'function') {
      throw new Error('arguments is not function')
    }
    if(!this._events.has(type)){
      handles = [];
      handles.push(fn);
      this._events.set(type,handles)
    } else {
      handles = this._events.get(type);
      if(handles.length >= this._maxListeners) {
        throw new Error('error')
      }
      handles.push(fn);
    }
    return () => {
      let handles = this._events.get(type), idx;
      if(handles.length === 1) {
        this._events.delete(type);
      } else {
        idx = handles.indexOf(fn);
        if(idx !== -1){
          handles.splice(idx, idx + 1);
        }
      }
      return fn;
    };
  }
}

const event = new EventEmeitter();
function fn1 () {
  console.log(1);
}
function fn2() {
  console.log(2)
}
function fn3() {
  console.log(3)
}
const f = event.add('fn',fn1);
event.add('fn',fn2)();
event.add('fnn',fn3);
console.log(f);
event.emit('fn');
f();
console.log(event);
event.emit('fn');
event.emit('fnn');




