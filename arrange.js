class Schedule {
  constructor(message) {
    this.tasks = []
    this.tasks.push(() => console.log(`${message} is notified`))
  }
  wait(time) {
    this.tasks.push(() => {})
    return this
  }
  waitFirst(time) {
    this.tasks.unshift(`wait:${time}`)
    return this
  }
  do(message) {
    this.tasks.push(`call:Start to ${message}`)
    return this
  }
  async execute() {
    for(let i = 0, len = this.tasks.length; i < len; i ++) {
      const [order, value] = this.tasks[i].split(':')
      if(order === 'call') {
        console.log(value)
      }
      if(order === 'wait') {
        await this.waitTime(value)
      }
    }
  }
  waitTime(time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, time)
    })
  }
}
function arrange(message) {
  return new Schedule(message)
}

// arrange('William').execute();
// arrange('William').wait(5000).do('commit').execute()
arrange('William').waitFirst(3000).do('push').execute();