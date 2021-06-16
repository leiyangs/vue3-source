// 防抖
export function debounce(func, delay) {
  var timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  }
}

// 节流
export function throttle(func, delay) {
  var timer = null;
  return function () {
    if(!timer) {
      func.apply(this, arguments);
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    }else {
      console.log('时间未到')
    }
  }
}
