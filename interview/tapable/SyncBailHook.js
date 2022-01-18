class SyncBailHook {
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
    this.taps.some(tap => tap.fn(...param) !== undefined)
  }
}

export default SyncBailHook
