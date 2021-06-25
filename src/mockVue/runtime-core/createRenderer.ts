/* 创建渲染器 函数柯里化*/

import { shapeFlags } from "../shared";
import { createAppAPI } from "./apiCreateApp";

/**
 * 创建渲染器
 * @param options 接收不同平台传递的参数，实现跨平台操作
 * @returns
 */
export function createRenderer(options: object) {
  return baseCreateRenderer(options);
}

function baseCreateRenderer(options: object) {
  const render = (vNode: any, container: any) => {
    patch(null, vNode, container);
  };

  const mountElement = (n1: any, container: any) => {};
  const patchElement = (n1: any, n2: any, container: any) => {};
  const mountComponent = (n1: any, container: any) => {};
  const updateComponent = (n1: any, n2: any, container: any) => {};

  // 处理元素
  const processElement = (n1: any, n2: any, container: any) => {
    if (n1 === null) {
      mountElement(n1, container);
    } else {
      patchElement(n1, n2, container);
    }
  };

  // 处理组件
  const processComponent = (n1: any, n2: any, container: any) => {
    if (n1 === null) {
      //挂载
      mountComponent(n1, container);
    } else {
      //更新
      updateComponent(n1, n2, container);
    }
  };

  // n1老节点 n2新节点
  const patch = (n1: any, n2: any, container: any) => {
    // 将虚拟节点转化为真实节点，挂载到容器上
    let { shapeFlag } = n2;
    // 推断类型最佳实践 &与 两边都是1 才返回1
    // 二进制类型每位一次判断 00010000 10001000
    if (shapeFlag & shapeFlags.ELEMENT) {
      // 元素
      processElement(n1, n2, container);
    } else if (shapeFlag & shapeFlags.STATEFUL_COMPONENT) {
      // 组件
      processComponent(n1, n2, container);
    }
  };

  return {
    createApp: createAppAPI(render),
  };
}
