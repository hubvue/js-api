;(modules => {
  var installModules = {}
  function require(moduleId) {
    if (installModules[moduleId]) {
      return installModules[moduleId].exports
    }
    var module = (installModules[moduleId] = {
      id: moduleId,
      exports: {},
      children: []
    })
    modules[moduleId].call(module.exports, module, module.exports, require)
    return module.exports
  }
  return require('./src/index.js')
})({
  './src/index.js': function(module, exports, require) {
    const a = require('./src/a.js')
    a['default']()
  },
  './src/a.js': function(module, exports, require) {
    exports['default'] = function() {
      console.log('a')
    }
  }
})
