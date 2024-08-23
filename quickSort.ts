/**
 * 快排递归
 * @param arr 
 * @returns 
 */
const quickSort = <T>(arr: T[]) => {
  if (arr.length < 2) {
    return arr
  }
  const mid = arr.shift()!
  const left: T[] = []
  const right: T[] = []
  for (let item of arr) {
    if (item < mid) {
      left.push(item)
    } else {
      right.push(item)
    }
  }
  return quickSort(left).concat(mid, quickSort(right))
}

const quickSortLoop = <T>(arr: T[]) => {
  const left = 0
  const right = arr.length - 1
  const stack = [[left, right]]
  while (stack.length) {
    const [left, right] = stack.pop()!
    const pivotIdx = partition(arr, left, right)
    if (left < pivotIdx - 1) {
      stack.push([left, pivotIdx - 1])
    }
    if (pivotIdx + 1 < right) {
      stack.push([pivotIdx + 1, right])
    }
  }
  return arr
}

const partition = <T>(arr: T[], left: number, right: number): number => {
  const pivot = arr[right]
  let i = left - 1
  for (let j = left; j < right; j ++) {
    if (arr[j] < pivot) {
      i ++;
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
  }
  [arr[i + 1], arr[right]] = [arr[right], arr[ i + 1]]
  return i + 1
}



const arr = [1, 3, 2, 5, 4, 7, 6, 9, 8]

console.log(quickSortLoop(arr))
