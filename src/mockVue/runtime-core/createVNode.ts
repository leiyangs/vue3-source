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
  // 虚拟节点可以表示dom结构，也可以表示
  const vnode = {
    type,
    props,
    children,
    component: null,
    el: null,
    shapeFlag: null, // vue3中 虚拟节点类型
  };
}
