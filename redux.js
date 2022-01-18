function createStore(reducer, initialState, enhancer) {
  let state
  let currentReducer = reducer
  let subQueue = []
  let isDispatch = false
  if (initialState) {
    state = initialState
  }
  // if(enhancer && typeof enhancer === 'function') {
  //       return enhancer(createStore)(currentReducer, initialState);
  // }
  //   const getState = () => {
  //     if (isDispatch) {
  //       throw new Error('dispatch is running')
  //     }
  //     return state
  //   }
  //   const subscribe = fn => {
  //     subQueue.push(fn)
  //     return () => {
  //       if (subQueue.includes(fn)) {
  //         subQueue = subQueue.filter(item => item !== fn)
  //       }
  //       return fn
  //     }
  //   }
  //   const dispatch = action => {
  //     if (isDispatch) {
  //       throw new Error('dispatch is running')
  //     }
  //     try {
  //       isDispatch = true
  //       state = currentReducer(state, action)
  //       subQueue.forEach(fn => fn.call(null, state))
  //     } finally {
  //       isDispatch = false
  //     }
  //     return action
  //   }
  //   const replaceReducer = reducer => {
  //     if (reducer) {
  //       currentReducer = reducer
  //     }
  //     dispatch({ type: 'REPLACE' })
  //   }
  // dispatch({type: 'INIT'})
  const getState = () => {
    if (!isDispatch) {
      return state
    } else {
      throw new Error('dispatching')
    }
  }
  const subscribe = fn => {
    subQueue.push(fn)
    return () => {
      subQueue = subQueue.filter(item => item !== fn)
    }
  }
  const dispatch = action => {
    isDispatch = true
    try {
      state = currentReducer(state, action)
    } catch (e) {
      console.log(e)
    } finally {
      isDispatch = false
    }
  }
  const replaceReducer = reducer => {
    currentReducer = reducer
  }
  return {
    dispatch,
    getState,
    replaceReducer,
    subscribe
  }
}

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
const applyMiddleware = (...middlewares) => createStore => (...args) => {
  let store = createStore(...args)
  let dispatch = () => {
    throw new Error('error')
  }
  let middlewareAPI = {
    getState: store.getState,
    dispatch
  }
  const chain = middlewares.map(middleware => middleware(middlewareAPI))
  dispatch = compose(...chain)(store.dispatch)
  return {
    ...store,
    dispatch
  }
}
// resux-thunk
const middlewrare = store => next => action => {
  if (typeof action === 'function') {
    action(store.dispatch, store.getState)
  }
  next(action)
}
module.exports = {
  createStore,
  compose,
  applyMiddleware
}

const reducer = (store, action) => {
  switch (action.type) {
    default:
      return store
  }
}
dispatch(() => {
  fetch()
  return dispatch => {}
})
