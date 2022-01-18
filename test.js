// const jsonp = (url, params, callback) => {
//   return new Promise((resolve, reject) => {
//     let script = document.createElement('script')
//     window[callback] = data => {
//       resolve(data)
//     }
//     params = { ...params, callback }
//     let arrs = []
//     Object.keys(params).forEach(key => {
//       arrs.push(`${key}=${params[key]}`)
//     })
//     script.src = `${url}?${arrs.join('&')}`
//     document.body.appendChild(script)
//   })
// }

var isHappy = function(n) {
  if (n === 1) {
    return true
  }
  let set = new Set()
  set.add(n)
  let i = 1
  while (true) {
    let str = n + ''
    debugger
    n = str
      .split('')
      .map(item => item * item)
      .reduce((pre, item) => pre + item, 0)
    console.log(n)
    if (n === 1) {
      return true
    }
    if (set.has(n)) {
      break
    } else {
      set.add(n)
    }
  }
  return false
}
isHappy(20)
