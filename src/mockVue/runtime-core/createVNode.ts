import { isArray, isObject, isString, shapeFlags } from "../shared";

/**
 * 创建虚拟节点
 * @param type 是类型或者rootComponent
 * @param props
 * @param children
 */
export function createVNode(
  type: string | object,
  props = {},
  children = null
) {
  const shapeFlag = isString(type)
    ? shapeFlags.ELEMENT
    : isObject(type)
    ? shapeFlags.STATEFUL_COMPONENT
    : 0;
  // 虚拟节点可以表示dom结构，也可以表示
  const vnode = {
    type,
    props,
    children,
    component: null,
    el: null,
    shapeFlag, // vue3中 虚拟节点类型
  };
  if (isArray(children)) {
    // 如果两数或等中，有一个是1就是1  把两个数相加
    // 1 |= 16 = 17
    // 00000001 |= 00100000 => 00100001 = 17
    vnode.shapeFlag |= shapeFlags.ARRAY_CHILDREN;
  } else {
    // 1 |= 8 = 9
    vnode.shapeFlag |= shapeFlags.TEXT_CHILDREN;
  }
  return vnode;
}
