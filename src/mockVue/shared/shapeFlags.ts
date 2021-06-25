export const enum shapeFlags {
  ELEMENT = 1,
  FUNCTIONAL_COMPONENT = 1 << 1, // 位运算符 右移运算 0000001 => 0000010(二进制代表2,满2进1) => 0000100(2) 相当于 Math.pow(2,1)
  STATEFUL_COMPONENT = 1 << 2, // 4
  TEXT_CHILDREN = 1 << 3, // 8
  ARRAY_CHILDREN = 1 << 4, // 16
}
console.log(Math.pow(2, 3));
