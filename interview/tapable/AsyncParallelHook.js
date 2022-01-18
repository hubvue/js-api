class AsyncParallelHook {
  constructor(args) {
    this._args = args
    this.asyncTaps = []
    this.promiseTaps = []
  }
  tapAsync(name, fn) {
    this.tapAsync.push({
      type: 'async',
      name,
      fn
    })
  }
  callAsync(...args) {
    let callback = args.pop()
    let idx = 0
    let len = this.asyncTaps.length
    let done = () => {
      idx++
      if (idx === len) {
        callback()
      }
    }
    this.asyncTaps.forEach(tap => tap.fn(...args, done))
  }
  tapPromise(name, fn) {
    this.promiseTaps.push({
      type: 'async',
      name,
      fn
    })
  }
  promise(...args) {
    let param = args.splice(0, this._args.length)
    let promises = this.promiseTaps.map(tap => tap.fn(...param))
    return Promise.all(promises)
  }
}

export default AsyncParallelHook
