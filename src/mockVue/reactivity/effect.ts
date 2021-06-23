// effect检测数据是否变化
export function effect(fn: any, options: any = {}) {
  const effect = createReactiveEffect(fn, options);
  // 开始就执行
  if (options.lazy) {
    effect();
  }

  return effect;
}

let activeEffect: any; // 保存当前的effect
function createReactiveEffect(fn: any, options: any) {
  const effect = function() {
    activeEffect = effect;
    return fn(); // 自己写的逻辑
  };

  return effect;
}

// {object: {key: [effect,effect]}}
// 收集依赖 将属性和effect做关联
const targetMap = new WeakMap();
export function track(target: any, key: any) {
  if (activeEffect == undefined) {
    return;
  }
  // 查看是否有映射关系
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    // 如果没有给默认值 {object: {}}
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (!dep) {
    // {object: {key: Set()}}
    depsMap.set(key, (dep = new Set()));
  }
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);
    //
  }
}

// 触发更新
export function trigger(
  target: any,
  type: string,
  key: string,
  value: any,
  oldValue?: any
) {
  let depsMap = targetMap.get(target);
  if (!depsMap) return;
  const run = (effects: any) => {
    effects.forEach((effect: any) => effect());
  };
  if (key !== void 0) { // 如果修改了key
    run(depsMap.get(key));
  }
}
