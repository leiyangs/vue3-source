import { isObject } from "../shared";
import { mutableHandlers } from "./baseHandlers";

export function reactive(target: object) {
  // 将target转换为响应式对象 Proxy
  return createReactiveObject(target, mutableHandlers);
}

const proxyMap = new WeakMap();
function createReactiveObject(target: object, baseHandlers: object) {
  // 如果不是对象 Proxy可以代理数组
  if (!isObject(target)) return target;

  // 如果已经存在就不重新转换
  const existingProxy = proxyMap.get(target);
  if (existingProxy) return existingProxy;

  const proxy = new Proxy(target, baseHandlers);
  proxyMap.set(target, proxy); // target和proxy做映射关系
  return proxy;
}
