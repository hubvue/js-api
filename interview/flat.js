const flat = arr => {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}
const flat1 = arr =>
  arr.reduce(
    (temp, item) =>
      Array.isArray(item) ? temp.concat(flat1(item)) : temp.concat([item]),
    []
  )
var arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10]

console.log(flat1(arr))
