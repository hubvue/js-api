const KEY_POLL = new Map();
class Locker {
  constructor(name) {
    this.name = name;
  }
  release() {
    KEY_POLL.delete(this.name)
  }
}
class LockService {
  async lockByKey(key) {
    const locker = new Locker(key)
    await this.loopCheckLocked(key)
    KEY_POLL.set(key,locker)
    return locker;
  }
  loopCheckLocked(key) {
    return new Promise(resolve => {
      setInterval(() => {
        if(!KEY_POLL.has(key)) {
          resolve()
        }
      },200)
    })
  }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
const lockService = new LockService()


async function process(key) {
  // 同一个key会被锁住，不同的key不受影响
  let locker = await lockService.lockByKey(key)
  console.log('get locker', key)
  try {
    // 停留1s
    await delay(1000)
  } finally {
    console.log('end locker', key)
    locker.release()
  }
}

process('key1')
process('key1')
process('key2')
