// 对dom的操作
export const nodeOps = {
  // 创建
  createElement(type: any) {
    return document.createElement(type);
  },
  // 修改文本
  setElementText(el: any, text: any) {
    el.textContent = text;
  },
  // 插入节点
  insertElement(child: any, parent: any, anchor=null) {
    parent.insertBefore(child, anchor); // anchor参照物，插入到谁的前面
  },
  // 删除节点
  removeElement(child: any) {
    const parent = child.parentNode;
    if(parent) {
      parent.removeChild(child);
    }
  }
}