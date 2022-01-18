
const func = () => {
  console.log("Hello world")
}

function onFetch() {
  return new Promise<number>((resolve, reject) => {
    // resolve(false)
    resolve(123)
  })
}
onFetch().then(val1 => {

}, val2 => {

})