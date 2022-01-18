class Throttle {
  constructor(fn, timer = 1000) {
    if (typeof fn !== 'function') {
      throw new Error('first param  is not function')
    }
    this.fn = fn
    this.timer = timer
    this.args = null
    this.context = null
    this.timeout = null
    this.result = null
  }
  throttled() {
    const _self = this
    return function(...args) {
      _self.args = args
      _self.context = this
      if (!_self.timeout) {
        _self.result = _self.fn.apply(_self.context, _self.args)
        _self.timeout = setTimeout(() => {
          _self.timeout = null
        }, _self.timer)
        return _self.result
      }
    }
  }
  cancel() {
    let _self = this
    return function() {
      if (_self.timeout) {
        _self.result = _self.fn.apply(_self.context, _self.args)
      }
      clearTimeout(_self.timeout)
      _self.timeout = null
      return _self.result
    }
  }
}
