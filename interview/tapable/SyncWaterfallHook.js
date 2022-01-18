class SyncWaterfallHook {
  constructor(args) {
    this._args = args
    this.taps = []
  }
  tap(name, fn) {
    this.taps.push({
      type: 'sync',
      name,
      fn
    })
  }
  call(...args) {
    let param = args.splice(0, this._args.length)
    let [first, ...other] = this.taps
    other.reduce((result, next) => {
      return result !== undefined ? next.fn(result) : next.fn(...param)
    }, first.fn(...param))
  }
}
export default SyncWaterfallHook
