// function add(numStr1, numStr2) {
//   let result = add.maxNumAdd(numStr1, numStr2);
//   add.result = result;
//   return add;
// }
// // 大数相加方法
// add.maxNumAdd = function(numStr1,numStr2) {
//   // 判断numStr1和numStr2是不是string类型
//   if(typeof numStr1 !== 'string' || typeof numStr2 !== 'string'){
//       throw new Error('argument is not string type');
//   }
//   // 由于位数可能不同，把string切成数组再反转，从后向前计算
//   let arr1 = numStr1.split('').reverse();
//   let arr2 = numStr2.split('').reverse();
//   let result = [],
//       arr1Idx = 0,
//       arr2Idx = 0,
//       arr1Len = arr1.length,
//       arr2Len = arr2.length,
//       cache = 0;
//   // 遍历计算
//   while (arr1Idx < arr1Len && arr2Idx < arr2Len) {
//       let temp = +arr1[arr1Idx] + +arr2[arr2Idx];
//       if (cache) {
//           // 判断是否有前面进位
//           temp += cache;
//           cache = 0;
//       }
//       if (temp >= 10) {
//           // 求十位数 并 取整
//           cache = temp / 10 | 0;
//           result.push(temp % 10);
//         } else {
//           result.push(temp)
//         }
//         arr1Idx++;
//         arr2Idx++;
//       }
//       // 保证每个都没有剩余
//       while (arr1Idx < arr1Len) {
//         let temp = +arr1[arr1Idx];
//         if(cache) {
//           temp += cache;
//           cache = 0;
//         }
//         if (temp >= 10) {
//           // 求十位数 并 取整
//           cache = temp / 10 | 0;
//           result.push(temp % 10);
//         } else {
//           result.push(temp)
//         }
//       arr1Idx++
//   }
//   while (arr2Idx < arr2Len) {
//     let temp = +arr2[arr2Idx];
//       if(cache) {
//         temp += cache;
//         cache = 0;
//       }
//       if (temp >= 10) {
//         // 求十位数 并 取整
//         cache = temp / 10 | 0;
//         result.push(temp % 10);
//       } else {
//         result.push(temp)
//       }
//       arr2Idx++
//   }
//   if(cache){
//     result[result.length] = cache;
//     cace = 0;
//   }
//   return result.reverse().join("");
// }

// // 连续调用add方法
// add.add = function(numStr1){
//   let result = add.maxNumAdd(add.result,numStr1);
//   // add.result = result;
//   // return add;
//   return result;
// }
// // 结束方法
// add.end = function() {
//   return add.result;
// }
// var result = add('19', '9').add('1');

// var numTrees = function(n) {
//   let dp = []
//   dp[0] = 1
//   dp[1] = 1
//   debugger
//   for (let i = 2; i < n + 1; i++) {
//     for (let j = 1; j < i + 1; j++) {
//       console.log(dp[j - 1] * dp[i - 1])

//       dp[i] += dp[j - 1] * dp[i - j]
//     }
//   }
//   return dp[n]
// }
// console.log(numTrees(3))

let test_ob = {
  a: {
    b: {
      c: 1,
      d: 2
    }
  },
  b: 2
}
console.log(JSON.stringify(test_ob))

const isType = type => value =>
  Object.prototype.toString.call(value).slice(8, -1) === type
const isObject = isType('Object')

function zip(target, key, result) {
  Object.keys(target).forEach(keyv => {
    let currentKey = `${key}${keyv}`
    if (isObject(target[keyv])) {
      zip(target[keyv], `${currentKey}.`, result)
    } else {
      result[currentKey] = target[keyv]
    }
  })
}

let result = {}
zip(test_ob, '', result)
console.log(result)
