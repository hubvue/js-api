class SyncHook {
  constructor(args) {
    this._args = args
    this.taps = []
  }
  tap(name, fn) {
    this.taps.push({
      type: 'sync',
      fn,
      name
    })
  }
  call(...args) {
    let param = args.splice(0, this._args.length)
    this.taps.forEach(tap => tap.fn(...param))
  }
}
export default SyncHook
