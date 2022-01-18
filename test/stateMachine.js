const stateMap = new Map()
const cacheMap = new Map()

const createRegisterStateNode = stateMap => (key,payload) => {
  if(stateMap.has(key)) {
    throw Error(`${key} already exists in ${stateMap}.`)
  }
  stateMap.set(key, payload)
}


const createStateTransform = stateMap => (nextNode, endNode, state, ...data) => {
  const dpNext = [nextNode]
  const dpData = [data]
  const cacheKey = `${nextNode}-${endNode}`
  if (cacheMap.has(cacheKey)) {
    return cacheMap.get(cacheKey)
  }
  for(let i = 0; (dpNext[i] !== null && dpNext[i] !== endNode) ; i ++) {
    [dpNext[i + 1], ...dpData[i + 1]] = stateMap.get(dpNext[i])(state, ...dpData[i])
  }
  const resultData = dpData[dpData.length - 1]
  cacheMap.set(cacheKey, resultData)
  return resultData
}



module.exports = {
  registerStateNode: createRegisterStateNode(stateMap),
  stateTransform: createStateTransform(stateMap)
}
