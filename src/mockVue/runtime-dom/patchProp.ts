/* 对dom属性的操作 */

/**
 * 设置class
 * @param el
 * @param value
 */
function patchClass(el: any, value: string) {
  if (value == null) {
    value = "";
  }
  el.className = value;
}
/**
 * 设置style
 * @param el
 * @param prev
 * @param next
 */
function patchStyle(el: any, prev: any, next: any) {
  const style = el.style;
  if (!next) {
    // 如果没传就没有style样式
    el.removeAttribute(style);
  } else {
    // 循环设置style
    for (const key in next) {
      if (Object.prototype.hasOwnProperty.call(next, key)) {
        style[key] = next[key];
      }
    }
    // 如果之前有style，删除上次有，这次没有的样式
    if (prev) {
      for (const key in prev) {
        if (Object.prototype.hasOwnProperty.call(prev, key)) {
          if (next[key] == null) {
            style[key] = "";
          }
        }
      }
    }
  }
}
/**
 * 设置dom属性
 * @param el
 * @param key
 * @param nextValue
 */
function patchAttr(el: any, key: string, value: any) {
  // ducument.getElementById('btn').setAttribute("type","button")
  if (value == null) {
    el.removeAttribute(key);
  } else {
    el.setAtrribute(key, value);
  }
}
export function patchProp(
  el: string,
  key: string,
  prevValue: string,
  nextValue: string
) {
  switch (key) {
    case "class":
      patchClass(el, nextValue);
      break;
    case "style":
      patchStyle(el, prevValue, nextValue);
      break;
    default:
      patchAttr(el, key, nextValue);
  }
}
