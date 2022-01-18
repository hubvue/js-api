const { registerStateNode, stateTransform } = require('./stateMachine')

const state = {
  show_type: 1,
  share_status: undefined,
  prize_status: undefined,
  instance_end_time_ms: undefined,
  still_can_lanch: undefined,
}


const data = {
  type: '',
  value: ''
}

registerStateNode('a', (state, data,data1) => {
  if(state.show_type) {
    return ['b', data, data1]
  }
  return ['c', data,data1]
})


registerStateNode('b', (state, data,data1) => {
  if(state.share_status) {
    return ['c', data, data1]
  }
  return [null,'结果1']
})

registerStateNode('c', (state, data) => {
  // code
  return [null, '结果2']
})

const result = stateTransform('a','b', state, data,data)
const result1 = stateTransform('a','b', state, data,data)
console.log(result)
console.log(result1)

