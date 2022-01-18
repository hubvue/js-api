class Dedounce {
  constructor(fn, timer = 1000, immediate = false) {
    if (typeof fn !== 'function') {
      throw new Error('first param is not function')
    }
    this.fn = fn
    this.timer = timer
    this.immediate = immediate
    this.context = null
    this.args = null
    this.timeout = null
    this.result = null
  }
  debounced() {
    let _self = this
    return function(...args) {
      _self.context = this
      _self.args = args
      if (_self.timeout) {
        clearTimeout(_self.timeout)
      }
      if (_self.immediate) {
        let callNow = !_self.timeout
        _self.timeout = setTimeout(() => {
          _self.timeout = null
        }, _self.timer)
        if (callNow) {
          _self.result = _self.fn.apply(_self.context, _self.args)
        }
      } else {
        _self.timeout = setTimeout(() => {
          _self.result = _self.fn.apply(_self.context, _self.args)
        }, _self.timer)
      }
      return _self.result
    }
  }
  cancel() {
    let _self = this
    return function() {
      if (!_self.immediate) {
        _self.result = _self.fn.apply(_self.context, _self.args)
      }
      clearTimeout(_self.timeout)
      _self.timeout = null
      return _self.result
    }
  }
}
