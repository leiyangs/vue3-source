import { triggerRef } from "@vue/reactivity";

let activeEffect;
export function effect(fn) { // 渲染函数
  activeEffect = fn;
  fn();
}

export function reactive(target) {
  return new Proxy(target, {
    // get、set是拦截器，性能高但兼容性差
    set(target, key, value, receiver) { // receiver 接收器
      // target[key] = value;
      // Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。
      // Vue3中Object.defineProperty被Reflect.defineProperty代替方法(等更多其他方法)，优点是Reflect内置的静态方法有返回值
      let res = Reflect.set(target, key, value, receiver); // 将值分配给属性的函数。返回Boolean
      res && activeEffect();
      trigger(target, key); // 触发更新
      return res;
    },
    get(target, key, receiver) {
      if(typeof target[key] == 'object') {
        return reactive(target[key]);
      }else {
        const res = Reflect.get(targe, key, receiver); // 遵循保持Proxy和Reflect的关系(效果和target[key]相同)
        track(target,key); // 收集依赖(页面渲染用到才会收集)
        return res;
        return target[key];
      }
    }
  })
}

/* track 方法将生产下面格式的Map
{
  {name:'a',age:2} : {
    name: [activeEffect]
  }
} */

const targetMap = new WeakMap();
function trigger(target,key) {

}

function track(target,key) {
  let map = targetMap.get(target);
  if(!map) {
    targetMap.set(target, (map = new Map())); // 没取到赋默认值
  }
  let deps = map.get(key);
  if(!deps) {
    map.set(key, (dep = new Set()));
  }
  if(activeEffect && !deps.has(activeEffect)) {
    deps.add(activeEffect);
  }
}


// Proxy
let obj = {a: 1}
let p = new Proxy(obj,{
  set(obj, key, value, receiver) {
    // obj[key] = value;
    Reflect.set(obj, key, value, receiver);
  },
  get(target, key, receiver) {
    if(typeof target[key] == 'object') {
      // return reactive(target[key]);
    }else {
      return target[key];
    }
  }
})

p.b=2
console.log(p)