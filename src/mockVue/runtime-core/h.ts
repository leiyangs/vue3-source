import { createVNode } from "./createVNode";

// h就是createVNode方法的别名
export function h(type: string, props = {}, children = null) {
  return createVNode(type, props, children);
}
