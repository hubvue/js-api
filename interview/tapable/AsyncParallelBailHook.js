class AsyncParallelBailHook {
  constructor(args) {
    this._args = args
    this.asyncTaps = []
    this.promiseTaps = []
  }
  tapAsync(name, fn) {
    this.asyncTaps.push({
      type: 'async',
      name,
      fn
    })
  }
  callAsync(...args) {
    let callback = args.pop()
    let param = args.splice(0, this._args.length)

    let idx = 0
    let len = this.asyncTaps.length
    let done = () => {}
  }
  tapPromise(name, fn) {
    this.promiseTaps.push({
      type: 'async',
      name,
      fn
    })
  }
  promise(...args) {}
}
