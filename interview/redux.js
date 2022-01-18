const createStore = (reducer, initialState, enhancer) => {
  let currentReducer = reducer
  let store = initialState
  let isDispatch = false
  let subQueue = []
  if (enhancer) {
    enhancer(createStore)(currentReducer, initialState)
    return
  }
  const getStore = () => {
    if (isDispatch) {
      throw new Error('dispatching')
    }
    return store
  }
  const dispatch = action => {
    try {
      if (isDispatch) {
        throw new Error('dispatching')
      }
      isDispatch = true
      store = currentReducer(store, action)
    } finally {
      isDispatch = false
    }
    subQueue.forEach(sub => {
      sub(store, dispatch)
    })
  }
  const subscribe = listen => {
    subQueue.push(listen)
    return () => {
      subQueue = subQueue.filter(sub => sub !== listen)
    }
  }
  const replaceSubscribe = reducer => {
    currentReducer = reducer
    dispatch({ type: 'REPLACE_REDUCER' })
  }
  dispatch({ type: 'INIT' })
  return {
    getStore,
    dispatch,
    subscribe,
    replaceSubscribe
  }
}

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))

const applyMiddle = (...middlewares) => createStore => args => {
  const store = createStore(...args)
  let dispatch = () => {
    throw new Error('error')
  }
  const middlewareAPI = {
    getStore: store.getStore,
    dispatch
  }
  const chain = middlewares.map(middleware => middleware(middlewareAPI))
  dispatch = compose(...chain)(store.dispatch)
  return {
    ...store,
    dispatch
  }
}

const thunk = store => next => action => {
  if (typeof action === 'function') {
    action(store.getStore, store.dispatch)
  }
  next(action)
}

export default {
  createStore,
  compose,
  applyMiddle
}
