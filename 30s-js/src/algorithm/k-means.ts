const kMeans = (data: number[][], k = 1) => {
  
  const centroids = data.slice(0, k)
  const distances = Array.from({length: data.length}, () =>
    Array.from({length: k}, () => 0)
  )
  const classes = Array.from({length: data.length}, () => -1)

  let itr = true
  while(itr) {
    itr = false

    for (let d in data) {
      // 计算出当前点到每个中心点的距离
      for (let c = 0; c < k; c ++) {
        distances[d][c] = Math.hypot(
          ...Object.keys(data[0]).map(key => data[d][key] - centroids[c][key])
        )
      }
      // 获取到中心点最短距离的索引
      const m = distances[d].indexOf(Math.min(...distances[d]))
      if (classes[d] !== m) {
        itr = true
      }
      // 将当前点分类给m
      classes[d] = m
    }

    for (let c = 0; c < k; c ++) {
      // 将中心点初始化为0，计算新的中心点
      centroids[c] = Array.from({length: data[0].length}, () => 0)
      // 找到点数组中距离第c个中心点最近的点数量
      const size = data.reduce((acc, _, idx) => {
        // 表示当前点距离第c个中心点最近
        if (classes[idx] === c) {
          acc ++
          // 新的第c个中点为距离第c个中间最近的点的和
          for (let i in data[0]) {
            centroids[c][i] += data[idx][i]
          }
        }
        return acc
      }, 0)

      // 新的第c个中点为距离第c个中间最近的点的和，因此再求一个均值
      for (let i in data[0]) {
        centroids[c][i] = parseFloat(Number(centroids[c][i] / size).toFixed(2))
      }
      
    }
  }
  return classes
}

type Point = Array<number>
const kMeans2 = <T extends Point>(data: T[], k = 1) => {
  // 初始k个质心
  const centroids = data.slice(0, k)
  const distances = Array.from({ length: data.length}, () => Array.from({length: k}, () => 0))
  const classes = new Map<T, T[]>()
  const threshold = 0.1
  
  // 迭代器
  let iterator = true
  while(iterator) {
    iterator = false
    // 初始化类别
    classes.clear()
    for (let idx in centroids) {
      classes.set(centroids[idx], [])
    }

    for (let idx in data) {
      // 计算出当前到每个质心的距离
      for (let c = 0; c < k; c ++) {
        distances[idx][c] = Math.hypot(
          ...Object.keys(data[idx]).map(key => data[idx][key] - centroids[c][key])
        )
      }
      // 计算当前点到最小质心的索引
      const min = distances[idx].indexOf(Math.min(...distances[idx]))
      const points = classes.get(centroids[min])
      points.push(data[idx])
    }
    // 重新计算质心
    let oldCentroids = [...new Set(centroids)]
    for (let c = 0; c < k; c ++) {
      centroids[c] = Array.from({length: data[0].length}, () => 0) as T
      // 计算到当前质心距离最短的点的数量
      const size = data.reduce((acc, point, idx) => {
        const points = classes.get(oldCentroids[c])
        if (points.includes(point)) {
          // 点距离质心距离最短，数量+1
          acc ++
          // 同时计算新质心的位置
          for (let idx in point) {
            centroids[c][idx] += point[idx]
          }
        }
        
        return acc
      }, 0)

      // 新的质点需要取均值
      for (let key in centroids[c]) {
        centroids[c][key] = parseFloat(Number(centroids[c][key] / size).toFixed(2))
      }

    }
    // 比较新旧质心变化是否超过最大阈值
    for (let c = 0; c < k; c ++) {
      const diff = Math.hypot(
        ...Object.keys(oldCentroids[c]).map(key => oldCentroids[c][key] - centroids[c][key])
      )
      if (diff > threshold) {
        iterator = true
        break
      }
    }
  }
  return classes
}

console.log(kMeans([[0, 0], [0, 1], [1, 3], [2, 0]], 2))
console.log(kMeans([[0, 0, 0], [5, 0, 100], [6, 0, 0], [8, 0, 0]], 2))

console.log(kMeans2([[0, 0], [0, 1], [1, 3], [2, 0]], 2))

console.log(kMeans2([[0, 0, 0], [5, 0, 100], [6, 0, 0], [8, 0, 0]], 3))