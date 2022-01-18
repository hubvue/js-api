function findRepeatNumber(nums) {
  let i = 0
  debugger
  while(i < nums.length) {
      if (i === nums[i]) {
          i += 1
          continue
      }
      console.log(nums)
      if (nums[i] === nums[nums[i]]) {
          return nums[i]
      }
      let tmp = nums[i]
      nums[i] = nums[tmp]
      nums[tmp] = tmp
      // [nums[i], nums[nums[i]]] = [nums[nums[i]], nums[i]]
  }
  return -1
};

console.log(findRepeatNumber([2, 3, 1, 0, 2, 5, 3]))



function palindromeNumber(num) {
    var newNum = 0
    while (num > 0) {
        var x = num % 10
        num = parseInt(num / 10)
        newNum = newNum * 10 + x
    }
    return newNum
}
// console.log(palindromeNumber(123))