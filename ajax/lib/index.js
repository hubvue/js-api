// 实现一个Ajax jsonp
// readyState请求的状态
// 0：未初始化，open方法还未调用
// 1：载入，已经调用了send方法正在发送请求
// 2：载入完成，send方法已经完成，已经收到了全部的响应内容，
// 3：正在解析响应内容
// 4：响应内容解析完成，可以在客户端使用
let xhr
;(() => {
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest()
  } else {
    xhr = new ActiveXObject('Mircosoft.XMLHTTP')
  }
})()
const createAjax = (url = '', headers = {}) => {
  let baseUrl = url
  let baseHeaders = headers
  Object.keys(baseHeaders).forEach(key => {
    xhr.setRequestHeader(key, baseHeaders[key])
  })

  const formatParams = (params = {}) => {
    let paramsArr = []
    Object.keys(params).forEach(key => {
      paramsArr.push(`${key}=${params[key]}`)
    })
    return paramsArr.join('&')
  }

  const request = ({ type, url, params, async = true } = {}) => {
    return new Promise((resolve, reject) => {
      const format = formatParams(params)
      if (type === 'get' || type === 'GET') {
        xhr.open(
          type,
          `${baseUrl}${url}${format.length ? `?${parmat}` : ``}`,
          async
        )
        xhr.send()
      } else if (type === 'post' || type === 'POST') {
        xhr.open(type, `${baseUrl}${url}`, async)
        xhr.setRequestHeader(
          'Content-Type',
          'application/x-www-form-urlencoded'
        )
        xhr.send(format)
      }
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          resolve(shr.responseText)
        }
      }
      xhr.onerrpr = function(err) {
        reject(err)
      }
      xhr.ontimeout = function(err) {
        reject(err)
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
  const post = ({ url, params, async } = {}) => {
    return request({
      type: 'post',
      url,
      params,
      async
    })
  }
  const jsonp = ({ url, params = {} } = {}) => {
    return new Promise((resolve, reject) => {
      let script = document.createElement('script')
      let format = formatParams(params)
      const callback = data => {
        resolve(data)
      }
      script.src = `${baseUrl}${url}?${format}${
        format ? `&callback=${callback}` : `callback=${callback}`
      }`
      script.onerror = err => {
        reject(err)
      }
    })
  }
  return {
    get,
    post,
    jsonp
  }
}

export default {
  createAjax
}
