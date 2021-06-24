/* 创建渲染器 函数柯里化*/

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
  const render = (vNode: any, container: any) => {};

  return {
    createApp: createAppAPI(render),
  };
}
