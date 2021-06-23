import { createRenderer } from "../runtime-core/index";
import { nodeOps } from "./nodeOps";

// runtime-dom是针对dom操作的
function ensureRenderer() {
  return createRenderer(nodeOps);
}

export function createApp(rootComponent: any) {
  // 创建一个渲染器
  const app = ensureRenderer().createApp(rootComponent);
  const { mount } = app;
  // 切片编程方式 可以重写mount方法(对容器做操作，再挂载)
  app.mount = function(container) {
    container.innerHtml = '';
    mount(container);
  };
}
