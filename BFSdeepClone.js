//  function BFSdeepClone (target) {
//        let queue = [target];
//        let set = new Set();
//        let copyObj = {};
//        while(queue.length > 0) {
//             let current = queue.shift(); 
//             if(typeof current === 'object' && current) {

//             } else {
                  
//             }
//        }
//  }

// class Heap {
//       constructor(arr, k) {
//             let len = arr.length;
//             arr.sort((a , b) => a - b);
//             this.heap= arr.slice(len - k, len);
//             this.k = k;
//       }
//       add(num) {
//             let front = this.heap[0];
//             if(front < num) {
//                   this.heap.push(num);
//                   this.heap = this.heap.slice(this.heap.length - this.k, this.heap.length);
//                   this.shik();
//                   return this.heap[0];
//             }
//             return front;
            
//       }
//       shik(){
//             let len = this.heap.length;
//             let itemIdx = len - 1;
//             while(true) {
//                   let parentIdx = Math.round(itemIdx / 2) - 1;
//                   let sibling = parentIdx * 2 + 1 === itemIdx ? void 0 : itemIdx - 1;
//                   if(sibling) {
//                         if(this.heap[itemIdx] > this.heap[sibling]) {
//                               this.heap[itemIdx]^= this.heap[sibling];
//                               this.heap[sibling]^= this.heap[itemIdx];
//                               this.heap[itemIdx]^= this.heap[sibling];
//                         }
//                   }
//                   if(this.heap[parentIdx] > this.heap[itemIdx]) {
//                         this.heap[parentIdx]^= this.heap[itemIdx];
//                         this.heap[itemIdx]^= this.heap[parentIdx];
//                         this.heap[parentIdx]^= this.heap[itemIdx];
//                   } else {
//                         break;
//                   }
//                   itemIdx = parentIdx;
//             }
//       }
// }

// const heap = new Heap([7,6,5,4,3,2,1],5);
// heap.add(4);
// console.log(heap.heap);

var maxSlidingWindow = function(nums, k) {
      if(nums.length === 0) {
            return []
      }
      let result = [], window = [], len = nums.length;
      debugger;
      for(let i = 0; i < len; i ++) {
            while(window.length !== 0 && window[window.length - 1]<= nums[i]){
                  window.shift();
            }
            window.push(nums[i])
            if(i >=k - 1) {
                  result.push(window[0])
            }
      }
      return result;
};

console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7],3))