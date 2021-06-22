import { isObject } from "vant/lib/utils";
import { isSymbol } from "../utils";
import { reactive } from "./reactive";

// 使用工厂函数，传递参数可以做不同事情
function createGetter() {
  return function get(target: object, key: any, reciver: object) {
    const res = Reflect.get(target, key);
    // 如果是symbol就忽略(数组中有很多symbol的内置方法，vue源码中是判断了，方法是不是symbol内置的)
    if(isSymbol(key)) return res;

    // 收集依赖
    if(isObject(res)) {
      return reactive(res);
    }
    
    return res;
  };
}

function createSetter() {
  return function set(target: object, key: any, vlaue: any, reciver: object) {
    const res = Reflect.set(target, key, vlaue);

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
