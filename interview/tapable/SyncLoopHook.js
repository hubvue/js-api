class SyncLoopHook {
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
    let index = 0
    let taps = this.taps
    while (taps[index]) {
      taps[index].fn(...param) === undefined ? index++ : void 0
    }
  }
}
export default SyncLoopHook
