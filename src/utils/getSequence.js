// 最长递增子序列 LIS (找出最长连续的序列)

/* 
 [1,2,5,6,9,7,8,1] =>
 [1]
 [1,2]
 [1,2,5]
 [1,2,5,6]
 [1,2,5,6,9]
 [1,2,5,6,7]
 [1,2,5,6,7,8]
 [1,2,5,6,7,8]
*/

// 二分查找记录值中第一个比当前循环值大的 logn
// 如果遇到1，需要插到第0个位置，需要忽略
export default function getSequence(arr) {
  const p = arr.slice();
  const result = [0];
  const len = arr.length;
  // i=循环的i  j=result最后一位i(第一种情况)  u=首项  v=末项
  let i, j, u, v, c;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      // result记录的是下标，当前循环的值和记录最后一项比较(result下标找arr对应的值)
      j = result[result.length - 1];
      // 第一种情况，数组是递增的顺序
      if (arr[j] < arrI) {
        p[i] = j;
        result.push(i); // 存的是下标
        continue;
      }

      // 当前的值比result中的小，在数组中找到后替换
      // 二分查找 (首项 + 末项) / 2
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = ((u + v) / 2) | 0; // 3.5 | 0 == 3取整
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }

      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p[v];
  }
  return result;
}

let res = getSequence([10, 12, 12, 13, 14, 1, 0]);
console.log(res);