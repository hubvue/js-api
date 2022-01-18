// import { createAjax } from './lib'

const ajax = createAjax()
ajax
  .get({
    url: 'http://jsonplaceholder.typicode.com/posts'
  })
  .then(data => {
    console.log(data)
  })

let xhr
;(() => {
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest()
  } else {
    xhr = new ActiveXObject('Mircosoft.XMLHTTP')
  }
})()

const createAjax = (url, headers = {}) => {
  let baseUrl = url
  let baseHeaders = headers
  Object.keys(baseHeaders).forEach(header => {
    xhr.setRequestHeader(header, baseHeaders[header])
  })
  const formatParams = (params = {}) => {
    let result = []
    Object.keys(params).forEach(key => {
      result.push(`${key}=${params[key]}`)
    })
    return result.join('&')
  }
  const request = ({ type, url, params, async = true } = {}) => {
    return new Promise((resolve, reject) => {
      const format = formatParams(params)
      if (type === 'get' || type === 'GET') {
        xhr.open(type, `${baseUrl}${url}${format ? `?${format}` : ''}`, async)
        xhr.send()
      } else if (type === 'post' || type === 'POST') {
        xhr.open(type, `${baseUrl}${url}`, async)
        xhr.setRequestHeader(
          'Content-Type',
          'application/x-www-from-urlencoded'
        )
        xhr.send(format)
      }
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          resolve(xhr.responseText)
        }
      }
      xhr.onerror = function(err) {
        reject(err)
      }
      xhr.ontimeout = function() {
        reject('timeout')
      }
    })
  }
  const get = ({ url, params, async } = {}) => {
    return request({
      type: 'get',
      url,
      params,
      async
    })
  }
  const post = ({ url, params, async }) => {
    return request({
      type: 'post',
      url,
      params,
      async
    })
  }
  const jsonp = ({ url, params } = {}) => {
    return new Promise((resolve, reject) => {
      const format = formatParams(params)
      const script = document.createElement('script')
      const callback = data => {
        resolve(data)
      }
      script.src = `${baseUrl}${url}?${format}${
        format ? `&callback=${callback}` : `callback=${callback}`
      }`
      script.onerror = err => {
        reject(err)
      }
      document.body.appendChild(script)
    })
  }
  return {
    request,
    get,
    post,
    jsonp
  }
}
