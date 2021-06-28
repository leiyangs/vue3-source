/* 组件相关 */

import { isFunction } from "../shared";

/**
 * 创建组件实例
 * @param vnode
 * @returns
 */
export function createComponentInstance(vnode: any) {
  const instance = {
    type: vnode.type, // 类型
    props: vnode.props, // 属性
    vnode,
    instance: null,
    setupState: null,
    isMounted: false, // 默认组件没有挂载
  };
  return instance;
}

/**
 * 初始化组件
 * @param instance
 */
export function setupComponent(instance: any) {
  // 属性初始化
  // 插槽初始化
  // 调用setup
  setupStatefulComponent(instance);
}

/**
 * 调用setup
 * @param instance
 */
function setupStatefulComponent(instance: any) {
  const component = instance.type; // 组件的虚拟节点
  // vue3入口
  const { setup } = component;
  if (setup) {
    const setupResult = setup();
    // 判断返回实例类型
    handleSetupResult(instance, setupResult);
  }
}

/**
 * 获取render方法
 * @param instance
 * @param setupResult
 */
function handleSetupResult(instance: any, setupResult: any) {
  // 如果是函数，获取render方法
  if (isFunction(instance)) {
    instance.render = setupResult;
  } else {
    instance.setupState = setupResult;
  }
  finishComponentSetup(instance);
}

/**
 * 完成组件初始化
 * @param instance
 */
function finishComponentSetup(instance: any) {
  const component = instance.type;
  // render优先级高于setup，如果有render方法就执行render
  if (component.render) {
    instance.render = component.render;
  } else if (!instance.render) {
    // 如果没有render函数，编译成render函数
    // vue3兼容vue2中的属性方法(data component watch)
  }
}
