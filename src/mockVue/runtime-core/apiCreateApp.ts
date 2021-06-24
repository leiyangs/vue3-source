/* 纯mount */

import { createVNode } from "./createVNode"; // 创建虚拟节点

/**
 * createApp
 * @param render 传入的是vNode虚拟节点和container容器
 * @returns
 */
export function createAppAPI(render: any) {
  return (rootComponent: object) => {
    const app = {
      mount(container: any) {
        const vNode = createVNode(rootComponent);
        render(vNode, container); // createRenderer中的render函数
      },
    };
    return app;
  };
}
