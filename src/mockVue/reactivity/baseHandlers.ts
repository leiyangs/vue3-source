import { isObject } from "vant/lib/utils";
import { hasChanged, isInteger, isSymbol } from "../utils";
import { track, trigger } from "./effect";
import { reactive } from "./reactive";

// 使用工厂函数，传递参数可以做不同事情
function createGetter() {
  return function get(target: any, key: string, reciver: object) {
    const res = Reflect.get(target, key, reciver);
    // 如果是symbol就忽略(数组中有很多symbol的内置方法，vue源码中是判断了，方法是不是symbol内置的)
    if (isSymbol(key)) return res;

    // 收集依赖
    track(target, key); // {object: {key: [effect,effect]}}
    // 懒递归(如果取值是对象，继续代理)
    if (isObject(res)) {
      return reactive(res);
    }

    return res;
  };
}

function createSetter() {
  return function set(target: any, key: string, value: any, reciver: object) {
    const res = Reflect.set(target, key, value, reciver);

    // 区分是修改还是新增(数组上的/对象上的)
    // Array.isArray(target) && isInteger(key) 判断是数组
    const oldValue = target[key];
    const hasKey =
      Array.isArray(target) && isInteger(key)
        ? Number(key) < target.length
        : target.hasOwnProperty(key); // 是不是数组 ? 是数组并且修改下标(是否)小于数组的length : 是对象并且(是否)是对象中已有的属性

    if (!hasKey) {
      // 新增
      trigger(target, "add", key, value);
    } else if (hasChanged(value, oldValue)) {
      // 是修改并且改了值
      trigger(target, "set", key, value, oldValue);
    }

    return res;
  };
}

const get = createGetter();
const set = createSetter();
// 拦截
export const mutableHandlers = {
  // get() {}, // 拦截器
  // set() {}, // 拦截器
  get,
  set,
};
