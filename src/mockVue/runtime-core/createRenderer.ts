/* 创建渲染器 函数柯里化*/

import { effect } from "../reactivity";
import { shapeFlags } from "../shared";
import { createAppAPI } from "./apiCreateApp";
import { createComponentInstance, setupComponent } from "./component";

/**
 * 创建渲染器
 * @param options 接收不同平台传递的参数，实现跨平台操作
 * @returns
 */
export function createRenderer(options: any) {
  return baseCreateRenderer(options);
}

function baseCreateRenderer(options: any) {
  const render = (vNode: any, container: any) => {
    patch(null, vNode, container); // 递归对比
  };

  /**
   * 为组件创建effect
   * @param instance
   * @param initialVnode
   * @param container
   */
  function setupRenderEffect(instance: any, initialVnode: any, container: any) {
    effect(function() {
      // 判断组件是第一次加载，还是已经加载过更新组件
      if (!instance.isMounted) {
        // 创建
        const subTree = (instance.subTree = instance.render());
        patch(null, subTree, container);
        instance.isMounted = true;
      } else {
        // 更新 diff操作，两棵树的比对
        let prev = instance.subTree;
        let next = instance.render();
        patch(prev, next, container);
      }
    });
  }

  /**
   * 挂载多个子节点
   * @param container
   * @param children
   */
  function mountChildren(children: any, container: any) {
    for (let i = 0; i < children.length; i++) {
      const element = children[i];
      patch(null, element, container);
    }
  }
  // 解构已有方法
  const {
    createElement: hostCreateElement, // 别名
    patchProp: hostPatchProp,
    setElementText: hostSetElementText,
    insert: hostInsert,
    remove: hostRemove,
  } = options;
  const mountElement = (vnode: any, container: any) => {
    let { shapeFlag, props } = vnode;
    let el = (vnode.el = hostCreateElement(vnode.type));
    // 创建子节点
    if (shapeFlag & shapeFlags.TEXT_CHILDREN) {
      // 一个儿子
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & shapeFlags.ARRAY_CHILDREN) {
      // 多个儿子
      mountChildren(vnode.children, el);
    }
    // 如果有属性
    if (props) {
      for (const key in props) {
        if (Object.prototype.hasOwnProperty.call(props, key)) {
          const element = props[key];
          hostPatchProp(el, key, null, element);
        }
      }
    }
    hostInsert(el, container);
  };

  /**
   * 对比新老属性
   * @param oldProps
   * @param newProps
   * @param el
   */
  function patchProps(oldProps: any, newProps: any, el: any) {
    if (oldProps !== newProps) {
      // 有的新属性，覆盖老属性
      for (const key in newProps) {
        const prev = oldProps[key];
        const next = newProps[key];
        if (prev !== next) {
          hostPatchProp(el, key, prev, next);
        }
      }
      // 有的老属性但新的没有，删除老属性
      for (const key in oldProps) {
        if (!Object.prototype.hasOwnProperty.call(newProps, key)) {
          const prev = oldProps[key];
          hostPatchProp(el, key, prev, null);
        }
      }
    }
  }

  /**
   * 比较新/老子节点
   * @param c1
   * @param c2
   * @param el
   */
  function patchKeyChildren(c1: any, c2: any, el: any) {
    let i = 0;
    let e1 = c1.length; // 旧的子最后一项索引
    let e2 = c2.length; // 新的子最后一项索引
    // 正序循环对比(前面不动，后面需东 abc => abcd)
    while (i <= e1 && i <= e2) {
      // 所有的项都遍历完
      const n1 = c1[i];
      const n2 = c2[i];
      // 判断是不是相同标签
      if (isSameVnoedType(n1, n2)) {
        patch(n1, n2, el);
      } else {
        break;
      }
      i++;
    }
    // 倒序循环对比(后面不动，前面需动 adc => dabc)
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2];
      if (isSameVnoedType(n1, n2)) {
        patch(n1, n2, el);
      } else {
        break;
      }
      e1--;
      e2--;
    }
  }

  /**
   * 比较子(一个：字符串，多个：数组) 核心diff算法
   * @param n1
   * @param n2
   * @param el
   */
  function patchChildren(n1: any, n2: any, el: any) {
    const c1 = n1.children; // 所有老节点
    const c2 = n2.children; // 所有新节点
    const prevShapeFlag = n1.shapeFlag;
    const nextShapeFlag = n2.shapeFlag;
    // 老的是文本，新的是文本 => 新的替换老的
    // 老的是数组，新的是文本 => 新的覆盖老的
    if (nextShapeFlag & shapeFlags.TEXT_CHILDREN) {
      if (c1 !== c2) {
        hostSetElementText(el, c2);
      }
    } else {
      // 老的是数组，新的是数组 => diff算法
      if (prevShapeFlag & shapeFlags.ARRAY_CHILDREN) {
        patchKeyChildren(c1, c2, el);
      } else {
        // 老的是文本，新的是数组 => 删除老的，插入新的节点
        if (prevShapeFlag & shapeFlags.TEXT_CHILDREN) {
          // 删除老的文本
          hostSetElementText(el, "");
        }
        if (nextShapeFlag & shapeFlags.ARRAY_CHILDREN) {
          for (let i = 0; i < c2.length; i++) {
            const element = c2[i];
            patch(null, element, el);
          }
        }
      }
    }
  }
  const patchElement = (n1: any, n2: any, container: any) => {
    // 走到这里说明n1不为null，并且n1,n2的标签相同,那么老节点复用，比对他的props和儿子
    let el = (n2.el = n1.el);
    const oldProps = n1.props || {};
    const newProps = n2.props || {};
    // 比对属性
    patchProps(oldProps, newProps, el);
    // 比对children
    patchChildren(n1, n2, el);
  };
  const mountComponent = (initialVnode: any, container: any) => {
    // 组件挂载逻辑
    // 创建组件实例，记录当前组件的状态
    const instance = (initialVnode.component = createComponentInstance(
      initialVnode
    ));
    // 初始化组件并且找到组件的setup方法
    setupComponent(instance);
    // 为组件创建一个effect，相当于vue2中的watch(数据变化，重新渲染)
    setupRenderEffect(instance, initialVnode, container);
  };
  const updateComponent = (n1: any, n2: any, container: any) => {};

  // 处理元素
  const processElement = (n1: any, n2: any, container: any) => {
    if (n1 === null) {
      // 挂载元素
      mountElement(n2, container);
    } else {
      // 更新元素
      patchElement(n1, n2, container);
    }
  };

  // 处理组件
  const processComponent = (n1: any, n2: any, container: any) => {
    if (n1 === null) {
      //挂载组件
      mountComponent(n2, container);
    } else {
      //更新组件
      updateComponent(n1, n2, container);
    }
  };

  /**
   * 判断是不是相同标签元素
   * @param n1
   * @param n2
   * @returns
   */
  function isSameVnoedType(n1: any, n2: any) {
    // 判断标签名，和key(没传就是undefined)是否相同
    return n1.type === n2.type && n1.key === n2.key;
  }

  // n1老节点 n2新节点
  const patch = (n1: any, n2: any, container: any) => {
    // 如果有n1，说明是更新节点
    if (n1 && !isSameVnoedType(n1, n2)) {
      // 有老节点，并且老节点和新节点的标签不一样，删除老节点
      hostRemove(n1.el);
      n1 = null; // n1是null的话，process会挂载元素
    }

    // 将虚拟节点转化为真实节点，挂载到容器上
    let { shapeFlag } = n2;
    // 推断类型最佳实践 &与 两边都是1 才返回1
    // 二进制类型每位一次判断 00010000 10001000
    if (shapeFlag & shapeFlags.ELEMENT) {
      // 元素
      processElement(n1, n2, container);
    } else if (shapeFlag & shapeFlags.STATEFUL_COMPONENT) {
      // 组件
      processComponent(n1, n2, container);
    }
  };

  return {
    createApp: createAppAPI(render),
  };
}
