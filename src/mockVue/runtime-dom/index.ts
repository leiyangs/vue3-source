/* runtime-dom是针对dom操作的 */
import { createRenderer } from "../runtime-core/index"; // 核心渲染器
import { nodeOps } from "./nodeOps"; // dom操作
import { patchProp } from "./patchProp"; // dom属性操作

const renderOptions = { ...nodeOps, patchProp }; // 不同的平台传递不同的操作

function ensureRenderer() {
  // 函数柯里化的好处，保留了dom操作
  return createRenderer(renderOptions);
}

export function createApp(rootComponent: object) {
  // 创建一个渲染器
  const app = ensureRenderer().createApp(rootComponent);
  const { mount } = app;
  // 切片编程方式 可以重写mount方法(先对容器做操作，再挂载)
  app.mount = function(container: any) {
    container.innerHtml = "";
    mount(container);
  };
}
